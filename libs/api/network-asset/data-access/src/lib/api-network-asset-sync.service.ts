import { InjectFlowProducer, InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import {
  Identity,
  IdentityProvider,
  LogLevel,
  NetworkAsset,
  NetworkCluster,
  NetworkToken,
  NetworkTokenType,
  Prisma,
} from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import {
  convertDasApiAsset,
  findNetworkAssetDiff,
  isNetworkAssetEqual,
  NetworkAssetInput,
} from '@pubkey-link/api-network-util'
import { FlowProducer, Queue } from 'bullmq'
import {
  API_NETWORK_ASSET_SYNC,
  API_NETWORK_ASSET_UPSERT_FLOW,
  API_NETWORK_ASSET_UPSERT_QUEUE,
  API_NETWORK_ASSET_VERIFY,
  ASSET_UPSERT_FLOW,
  ASSET_UPSERT_QUEUE,
} from './helpers/api-network-asset.constants'

@Injectable()
export class ApiNetworkAssetSyncService {
  private readonly logger = new Logger(ApiNetworkAssetSyncService.name)
  private readonly assetTimeout = this.core.config.isDevelopment ? 1000 : 1000 * 60 * 10

  constructor(
    @InjectQueue(API_NETWORK_ASSET_SYNC) private networkAssetSyncQueue: Queue,
    @InjectQueue(API_NETWORK_ASSET_VERIFY) private networkAssetVerifyQueue: Queue,
    @InjectQueue(API_NETWORK_ASSET_UPSERT_QUEUE) private networkAssetUpsertQueue: Queue,
    @InjectFlowProducer(API_NETWORK_ASSET_UPSERT_FLOW) private networkAssetUpsertFlow: FlowProducer,
    private readonly core: ApiCoreService,
    private readonly network: ApiNetworkService,
  ) {}

  async sync({ cluster, identity }: { cluster: NetworkCluster; identity: Identity }) {
    // If the last sync was less than 10 minutes ago, do not sync
    if ((identity.syncEnded?.getTime() ?? 0) > new Date().getTime() - this.assetTimeout) {
      this.logger.log(`Identity ${identity.id} sync skipped, last sync less than 10 minutes ago`)
      return true
    }

    const job = await this.networkAssetSyncQueue.add('sync', { cluster, identity })

    return !!job.id
  }

  async verify({ cluster, asset }: { cluster: NetworkCluster; asset: NetworkAsset }) {
    const job = await this.networkAssetVerifyQueue.add('verify', { cluster, asset })

    return !!job.id
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async syncAllNetworkAssets({ force = false } = {}) {
    if (!this.core.config.syncNetworkAssets && !force) {
      this.logger.log(`Network asset sync is disabled`)
      return true
    }
    const cluster = this.network.cluster.getDefaultCluster()
    const network = await this.core.data.network.findUnique({ where: { cluster } })

    if (!network?.enableSync && !force) {
      this.logger.debug(`Network asset sync is disabled for ${cluster}`)
      return true
    }

    const identities = await this.core.data.identity.findMany({
      where: {
        provider: IdentityProvider.Solana,
        OR: [
          // Sync if the last sync was more than 10 minutes ago
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
    const jobs = identities.map((identity) => this.sync({ cluster, identity }))
    const results = await Promise.all(jobs)
    this.logger.log(`Queued ${results.length} identity syncs`)
    return results.every((r) => r)
  }

  @Cron(CronExpression.EVERY_4_HOURS)
  async verifyAllNetworkAssets() {
    const cluster = this.network.cluster.getDefaultCluster()
    const assets = await this.core.data.networkAsset.findMany({ where: { cluster } })
    if (!assets.length) {
      this.logger.log(`No assets to sync`)
      return true
    }
    this.logger.log(`Queuing ${assets.length} assets to verify`)
    const jobs = assets.map((asset) => this.verify({ cluster, asset }))
    const results = await Promise.all(jobs)
    this.logger.log(`Queued ${results.length} assets verified`)

    return results.every((r) => r)
  }

  async syncIdentity({
    cluster,
    owner,
  }: {
    cluster?: NetworkCluster
    owner: string
  }): Promise<Prisma.NetworkAssetCreateInput[]> {
    cluster = cluster ?? this.network.cluster.getDefaultCluster()
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
    const assetIds = assets.map((a) => a.account)

    this.logger.verbose(`Resolved ${assets.length} assets for ${owner} on ${cluster}`)
    if (!assets.length) {
      return []
    }

    // Upsert the assets
    await this.networkAssetUpsertFlow.add({
      name: ASSET_UPSERT_FLOW,
      queueName: API_NETWORK_ASSET_UPSERT_QUEUE,
      children: assets.map((asset) => ({
        queueName: API_NETWORK_ASSET_UPSERT_QUEUE,
        name: ASSET_UPSERT_QUEUE,
        data: { cluster, asset },
      })),
    })

    // Remove any assets that are not in the list
    const removedIds = await this.core.data.networkAsset.deleteMany({
      where: {
        owner,
        NOT: { account: { in: assetIds } },
      },
    })

    if (removedIds.count > 0) {
      await this.core.logInfo(`Removed ${removedIds.count} assets for ${owner} on ${cluster}`, {
        identityProvider: IdentityProvider.Solana,
        identityProviderId: owner,
      })
    }

    return assets
  }

  async verifyAsset({ cluster, asset: found }: { cluster: NetworkCluster; asset: NetworkAsset }): Promise<boolean> {
    const account = found.account
    const group = found.group ?? undefined
    this.logger.verbose(`Verifying assets ${account} on ${cluster}`)

    // Get the asset from the cluster
    const [asset, accountInfo] = await Promise.all([
      this.network.getAsset({ cluster, account }).then((res) => convertDasApiAsset({ asset: res, cluster, group })),
      this.network.getAccountInfo({ cluster, account }),
    ])

    if (!asset || !accountInfo) {
      this.logger.warn(`${cluster} => ${account}: Asset or account info not found`)
      const deleted = await this.core.data.networkAsset.delete({ where: { account_cluster: { account, cluster } } })
      this.logger.verbose(`${cluster} => ${account}: Deleted asset ${deleted.id}`)
      return false
    }
    const isEqual = isNetworkAssetEqual({ found, asset })
    this.logger.verbose(`${cluster} => ${account}: Asset found ${isEqual ? 'and' : 'but not'} equal`)

    if (isEqual) {
      this.logger.verbose(`${cluster} => ${account}: Asset found, no update needed`)
      return true
    }

    const updated = await this.core.data.networkAsset.update({
      where: { account_cluster: { account: asset.account, cluster } },
      data: asset,
    })

    this.logger.verbose(`${cluster} => ${account}: Updated asset ${updated.id}`)
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
            message: `Asset created: ${asset.name} (${asset.symbol})`,
            identityProviderId: asset.owner,
            identityProvider: IdentityProvider.Solana,
          },
        },
      },
    })
    return !!created
  }
}
