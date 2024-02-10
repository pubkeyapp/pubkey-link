import { InjectFlowProducer, InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Identity, IdentityProvider, LogLevel, NetworkCluster, NetworkToken, NetworkTokenType } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { findNetworkAssetDiff, isNetworkAssetEqual, NetworkAssetInput } from '@pubkey-link/api-network-util'
import { FlowProducer, Queue } from 'bullmq'
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
  private readonly assetTimeout = 1000 * 60 * 5

  constructor(
    @InjectQueue(API_NETWORK_ASSET_SYNC) private networkAssetSyncQueue: Queue,
    @InjectQueue(API_NETWORK_ASSET_UPSERT_QUEUE) private networkAssetUpsertQueue: Queue,
    @InjectFlowProducer(API_NETWORK_ASSET_UPSERT_FLOW) private networkAssetUpsertFlow: FlowProducer,
    private readonly core: ApiCoreService,
    private readonly network: ApiNetworkService,
  ) {}

  async sync(identity: Identity) {
    // If the last sync was less than 5 minutes ago, do not sync
    if ((identity.syncEnded?.getTime() ?? 0) > new Date().getTime() - this.assetTimeout) {
      this.logger.log(`Identity ${identity.id} sync skipped, last sync less than 5 minutes ago`)
      return true
    }

    const job = await this.networkAssetSyncQueue.add('sync', { cluster: NetworkCluster.SolanaMainnet, identity })

    return !!job.id
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async syncAll() {
    const identities = await this.core.data.identity.findMany({
      where: {
        provider: IdentityProvider.Solana,
        OR: [
          // Sync if the last sync was more than 5 minutes ago
          { syncEnded: { lt: new Date(new Date().getTime() - this.assetTimeout) } },
          { syncEnded: null },
        ],
      },
      include: { owner: true },
    })
    if (!identities.length) {
      this.logger.log(`No identities to sync`)
      return true
    }
    this.logger.log(`Queuing ${identities.length} identity syncs`)
    const jobs = identities.map((identity) => this.sync(identity))
    const results = await Promise.all(jobs)
    this.logger.log(`Queued ${results.length} identity syncs`)
    return results.every((r) => r)
  }

  async syncIdentity({ cluster, owner }: { cluster: NetworkCluster; owner: string }) {
    // Get the tokens for the cluster
    const tokens = await this.core.data.networkToken.findMany({ where: { network: { cluster } } })

    // Get the fungible and non-fungible tokens for the cluster
    const solanaFungibleTokens: NetworkToken[] = tokens.filter((t) => t.type === NetworkTokenType.Fungible)
    const solanaNonFungibleTokens: NetworkToken[] = tokens.filter((t) => t.type === NetworkTokenType.NonFungible)

    // Get the tokens that have a vault
    const anybodiesTokens: NetworkToken[] = solanaNonFungibleTokens.filter((v) => v.vault?.length)

    this.logger.verbose(
      `Syncing assets for ${owner} on ${cluster}, anybodiesTokens: ${anybodiesTokens.length}, solanaFungibleTokens: ${solanaFungibleTokens.length}, solanaNonFungibleTokens: ${solanaNonFungibleTokens.length},`,
    )
    const assets: NetworkAssetInput[] = await this.network.resolver.resolveNetworkAssets({
      cluster,
      owner,
      anybodiesTokens,
      solanaFungibleTokens,
      solanaNonFungibleTokens,
    })

    this.logger.verbose(`Resolved ${assets.length} assets for ${owner} on ${cluster}`)
    if (!assets.length) {
      return true
    }
    // Upsert the assets
    await this.networkAssetUpsertFlow.add({
      name: ASSET_UPSERT_FLOW,
      queueName: API_NETWORK_ASSET_UPSERT_QUEUE,
      children: assets.map((asset) => ({
        queueName: API_NETWORK_ASSET_UPSERT_QUEUE,
        name: ASSET_UPSERT_QUEUE,
        data: { cluster, asset },
        opts: { delay: 1000 },
      })),
    })

    return true
  }

  async upsertAsset({ asset, cluster }: { cluster: NetworkCluster; asset: NetworkAssetInput }) {
    const found = await this.core.data.networkAsset.findUnique({
      where: { account_cluster: { account: asset.account, cluster } },
    })
    if (found) {
      if (isNetworkAssetEqual({ found, asset })) {
        return true
      }
      const updated = await this.core.data.networkAsset.update({
        where: { account_cluster: { account: asset.account, cluster } },
        data: {
          ...asset,
          logs: {
            create: {
              level: LogLevel.Info,
              message: 'Asset updated',
              identityProviderId: asset.owner,
              identityProvider: IdentityProvider.Solana,
              data: findNetworkAssetDiff({ found, asset }),
            },
          },
        },
      })
      return !!updated
    }
    const created = await this.core.data.networkAsset.create({
      data: {
        ...asset,
        logs: {
          create: {
            level: LogLevel.Info,
            message: 'Asset created',
            identityProviderId: asset.owner,
            identityProvider: IdentityProvider.Solana,
          },
        },
      },
    })
    return !!created
  }
}
