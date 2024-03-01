import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Identity, NetworkCluster, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Job } from 'bullmq'
import { ApiNetworkAssetSyncService } from '../api-network-asset-sync.service'
import { API_NETWORK_ASSET_SYNC } from '../helpers/api-network-asset.constants'

export interface ApiNetworkAssetIdentitySyncPayload {
  cluster: NetworkCluster
  identity: Identity
}

@Processor(API_NETWORK_ASSET_SYNC, { concurrency: parseInt(process.env['SYNC_NETWORK_ASSETS_CONCURRENT'] || '2') })
export class ApiNetworkAssetSyncQueue extends WorkerHost {
  private readonly logger = new Logger(ApiNetworkAssetSyncQueue.name)
  constructor(private readonly core: ApiCoreService, private readonly sync: ApiNetworkAssetSyncService) {
    super()
  }

  override async process(
    job: Job<ApiNetworkAssetIdentitySyncPayload, boolean | undefined, string>,
  ): Promise<Prisma.NetworkAssetCreateInput[]> {
    this.logger.debug(`Dequeueing ${job.name} [${job.id}]`)
    await job.updateProgress(0)
    if (!job.data.identity.syncStarted) {
      await this.core.data.identity.update({ where: { id: job.data.identity.id }, data: { syncStarted: new Date() } })
    }
    const synced = await this.sync.syncIdentity({ cluster: job.data.cluster, owner: job.data.identity.providerId })

    if (synced.length > 0) {
      await job.log(`Synced ${job.data.identity.provider} identity ${job.data.identity.providerId}`)
      await this.core.logVerbose(
        `Synced ${synced.length} assets for ${job.data.identity.provider} identity ${job.data.identity.providerId} `,
        {
          identityProvider: job.data.identity.provider,
          identityProviderId: job.data.identity.providerId,
          userId: job.data.identity.ownerId,
        },
      )
    } else {
      await job.log(`No identities found for ${job.data.identity.provider} identity ${job.data.identity.providerId}`)
      await this.core.logWarning(
        `No identities found for ${job.data.identity.provider} identity ${job.data.identity.providerId}`,
        {
          identityProvider: job.data.identity.provider,
          identityProviderId: job.data.identity.providerId,
          userId: job.data.identity.ownerId,
        },
      )
    }

    return synced
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job<ApiNetworkAssetIdentitySyncPayload, boolean | undefined, string>) {
    this.logger.debug(`Finished ${job.name} [${job.id}]`)
    await this.core.data.identity.update({
      where: { id: job.data.identity.id },
      data: { syncEnded: new Date(), syncStarted: null },
    })
  }
}
