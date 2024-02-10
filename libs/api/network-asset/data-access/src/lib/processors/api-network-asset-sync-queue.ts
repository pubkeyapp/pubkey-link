import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Identity, NetworkCluster } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Job } from 'bullmq'
import { ApiNetworkAssetSyncService } from '../api-network-asset-sync.service'
import { API_NETWORK_ASSET_SYNC } from '../helpers/api-network-asset.constants'

export interface ApiNetworkAssetIdentitySyncPayload {
  cluster: NetworkCluster
  identity: Identity
}

@Processor(API_NETWORK_ASSET_SYNC, { concurrency: 4 })
export class ApiNetworkAssetSyncQueue extends WorkerHost {
  private readonly logger = new Logger(ApiNetworkAssetSyncQueue.name)
  constructor(private readonly core: ApiCoreService, private readonly sync: ApiNetworkAssetSyncService) {
    super()
  }

  override async process(job: Job<ApiNetworkAssetIdentitySyncPayload, boolean | undefined, string>): Promise<void> {
    this.logger.debug(`Dequeueing ${job.name} [${job.id}]`)
    await job.updateProgress(0)
    if (!job.data.identity.syncStarted) {
      await this.core.data.identity.update({ where: { id: job.data.identity.id }, data: { syncStarted: new Date() } })
    }
    const synced = await this.sync.syncIdentity({ cluster: job.data.cluster, owner: job.data.identity.providerId })

    if (synced) {
      await job.log(`Synced ${job.data.identity.provider} identity ${job.data.identity.providerId}`)
      await this.core.logInfo(`Synced ${job.data.identity.provider} identity ${job.data.identity.providerId}`, {
        identityProvider: job.data.identity.provider,
        identityProviderId: job.data.identity.providerId,
        userId: job.data.identity.ownerId,
      })
    } else {
      await job.log(`Failed to sync ${job.data.identity.provider} identity ${job.data.identity.providerId}`)
      await this.core.logError(
        `Failed to sync ${job.data.identity.provider} identity ${job.data.identity.providerId}`,
        {
          identityProvider: job.data.identity.provider,
          identityProviderId: job.data.identity.providerId,
          userId: job.data.identity.ownerId,
        },
      )
    }
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
