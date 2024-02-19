import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { NetworkCluster } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { NetworkAssetInput } from '@pubkey-link/api-network-util'
import { Job } from 'bullmq'
import { ApiNetworkAssetSyncService } from '../api-network-asset-sync.service'
import {
  API_NETWORK_ASSET_UPSERT_QUEUE,
  ASSET_UPSERT_FLOW,
  ASSET_UPSERT_QUEUE,
} from '../helpers/api-network-asset.constants'

export interface ApiNetworkAssetUpsertPayload {
  cluster: NetworkCluster
  asset: NetworkAssetInput
}

@Processor(API_NETWORK_ASSET_UPSERT_QUEUE, {
  concurrency: parseInt(process.env['SYNC_NETWORK_ASSETS_CONCURRENT'] || '2'),
})
export class ApiNetworkAssetUpsertQueue extends WorkerHost {
  private readonly logger = new Logger(ApiNetworkAssetUpsertQueue.name)
  constructor(private readonly core: ApiCoreService, private readonly sync: ApiNetworkAssetSyncService) {
    super()
  }

  override async process(job: Job<ApiNetworkAssetUpsertPayload, boolean | undefined, string>) {
    this.logger.debug(`Dequeueing ${job.name} [${job.id}]`)
    await job.updateProgress(0)

    switch (job.name) {
      case ASSET_UPSERT_QUEUE:
        this.logger.debug(`Upserting asset ${job.data.asset.account}`)
        return this.sync.upsertAsset({ cluster: job.data.cluster, asset: job.data.asset })
      case ASSET_UPSERT_FLOW:
        this.logger.debug(`Upserting assets...`)
        return await job.getChildrenValues().then((res) => {
          return `Upserted ${Object.keys(res).length} assets`
        })
      default:
        this.logger.error(`UNKNOWN JOB NAME ${job.name} [${job.id}]`)
    }
    return true
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<ApiNetworkAssetUpsertPayload, boolean | undefined, string>) {
    this.logger.debug(`Finished ${job.name} [${job.id}]`)
  }
}
