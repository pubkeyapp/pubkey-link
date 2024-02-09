import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { InjectFlowProducer, InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import {
  Identity,
  IdentityProvider,
  LogLevel,
  NetworkAsset,
  NetworkCluster,
  NetworkTokenType,
  Prisma,
} from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService, findAssetGroupValue } from '@pubkey-link/api-network-data-access'
import { FlowProducer, Queue } from 'bullmq'
import { deepEqual } from 'fast-equals'
import {
  API_NETWORK_ASSET_SYNC,
  API_NETWORK_ASSET_UPSERT_FLOW,
  API_NETWORK_ASSET_UPSERT_QUEUE,
  ASSET_UPSERT_FLOW,
  ASSET_UPSERT_QUEUE,
} from './helpers/api-network-asset.constants'

@Injectable()
export class ApiNetworkAssetSyncService {
  private readonly logger = new Logger(ApiNetworkAssetSyncService.name)
  constructor(
    @InjectQueue(API_NETWORK_ASSET_SYNC) private networkAssetSyncQueue: Queue,
    @InjectQueue(API_NETWORK_ASSET_UPSERT_QUEUE) private networkAssetUpsertQueue: Queue,
    @InjectFlowProducer(API_NETWORK_ASSET_UPSERT_FLOW) private networkAssetUpsertFlow: FlowProducer,
    private readonly core: ApiCoreService,
    private readonly network: ApiNetworkService,
  ) {}

  async sync(identity: Identity) {
    const job = await this.networkAssetSyncQueue.add('sync', { cluster: NetworkCluster.SolanaMainnet, identity })

    return !!job.id
  }

  async syncIdentity({ cluster, owner }: { cluster: NetworkCluster; owner: string }) {
    await this.fetchFungibleAssets({ cluster, owner })
    await this.fetchNonFungibleAssets({ cluster, owner })
    return true
  }

  private async fetchFungibleAssets({ cluster, owner }: { cluster: NetworkCluster; owner: string }) {
    const tokens = await this.core.data.networkToken.findMany({
      where: { network: { cluster }, type: NetworkTokenType.Fungible },
    })

    this.logger.verbose(`Fetching ${tokens.length} tokens on ${cluster}`)
    const assets = await this.network.resolveSolanaFungibleAssets({ cluster, owner, tokens })
    this.logger.verbose(`Fetched ${assets?.length} assets for ${owner} on ${cluster}`)

    await this.networkAssetUpsertFlow.add({
      name: ASSET_UPSERT_FLOW,
      queueName: API_NETWORK_ASSET_UPSERT_QUEUE,
      children: (assets ?? []).map((asset) => ({
        queueName: API_NETWORK_ASSET_UPSERT_QUEUE,
        name: ASSET_UPSERT_QUEUE,
        data: { cluster, asset },
        opts: { delay: 1000 },
      })),
    })
    return true
  }

  private async fetchNonFungibleAssets({ cluster, owner }: { cluster: NetworkCluster; owner: string }) {
    const groups = await this.core.data.networkToken
      .findMany({ where: { network: { cluster }, type: NetworkTokenType.NonFungible } })
      .then((items) => items.map((item) => item.account))

    this.logger.verbose(`Fetched ${groups.length} groups for ${owner} on ${cluster}`)
    const assets = await this.network.getAllAssetsByOwner({ cluster, owner, groups })
    this.logger.verbose(`Fetched ${assets.items?.length} assets for ${owner} on ${cluster}`)

    await this.networkAssetUpsertFlow.add({
      name: ASSET_UPSERT_FLOW,
      queueName: API_NETWORK_ASSET_UPSERT_QUEUE,
      children: (assets.items ?? []).map((asset) => ({
        queueName: API_NETWORK_ASSET_UPSERT_QUEUE,
        name: ASSET_UPSERT_QUEUE,
        data: { cluster, asset: convertDasApiAsset({ asset, cluster }) },
        opts: { delay: 1000 },
      })),
    })
    return true
  }

  async upsertAsset({ asset, cluster }: { cluster: NetworkCluster; asset: Prisma.NetworkAssetCreateInput }) {
    const found = await this.core.data.networkAsset.findUnique({
      where: { account_cluster: { account: asset.account, cluster } },
    })
    if (found) {
      if (isEqual({ found, asset })) {
        this.logger.verbose(`Asset ${asset.id} is up to date`)
        return true
      }
      console.log(findDiff({ found, asset }))
      this.logger.warn(`TODO: Update asset ${asset.account} on ${cluster} for ${asset.owner} with ${asset.name}`)
      return true
    }
    const created = await this.core.data.networkAsset.create({
      data: {
        ...asset,
        logs: {
          create: {
            level: LogLevel.Info,
            message: 'Created',
            identityProviderId: asset.owner,
            identityProvider: IdentityProvider.Solana,
          },
        },
      },
    })
    return !!created
  }
}

function convertDasApiAsset({
  asset,
  cluster,
}: {
  asset: DasApiAsset
  cluster: NetworkCluster
}): Prisma.NetworkAssetCreateInput {
  return {
    account: asset.id,
    network: { connect: { cluster } },
    name: asset.content.metadata.name,
    symbol: asset.content.metadata.symbol,
    owner: asset.ownership.owner,
    type: NetworkTokenType.NonFungible,
    group: findAssetGroupValue(asset),
    decimals: 0,
    balance: '1',
    mint: asset.id,
    program: '',
    imageUrl: asset.content.files?.length ? asset.content.files[0].uri : '',
    metadata: asset.content.metadata as Prisma.InputJsonValue,
    attributes: (asset.content.metadata.attributes ?? [])
      .filter((s) => s.trait_type && s.value)
      .map((s) => [s.trait_type, s.value]) as Prisma.InputJsonValue,
  }
}

function isEqual({ found, asset }: { found: NetworkAsset; asset: Prisma.NetworkAssetCreateInput }) {
  return deepEqual(getSummaryNetworkAsset(found), getSummaryNetworkAsset(asset))
}

const fields = [
  'account',
  'name',
  'symbol',
  'owner',
  'type',
  'group',
  'decimals',
  'mint',
  'program',
  'imageUrl',
  'metadata',
  'attributes',
]
function getSummaryNetworkAsset(asset: Record<string, unknown>) {
  // Get all these fields from the asset and return them as an object, filtering null values
  return fields.reduce((acc, field) => {
    if (asset[field] !== null && asset[field] !== undefined) {
      acc[field] = asset[field] as unknown
    }
    return acc
  }, {} as Record<string, unknown>)
}

function findDiff({ found, asset }: { found: Record<string, unknown>; asset: Record<string, unknown> }) {
  return fields.reduce((acc, field) => {
    if (found[field] !== asset[field]) {
      acc[field] = { found: found[field], asset: asset[field] }
    }
    return acc
  }, {} as Record<string, unknown>)
}
