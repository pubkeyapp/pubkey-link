import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { NetworkAsset, NetworkCluster } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { Job } from 'bullmq'
import { ApiNetworkAssetSyncService } from '../api-network-asset-sync.service'
import { API_NETWORK_ASSET_VERIFY } from '../helpers/api-network-asset.constants'

export interface ApiNetworkAssetIdentityVerifyPayload {
  cluster: NetworkCluster
  asset: NetworkAsset
}

@Processor(API_NETWORK_ASSET_VERIFY, { concurrency: parseInt(process.env['VERIFY_NETWORK_ASSETS_CONCURRENT'] || '1') })
export class ApiNetworkAssetVerifyQueue extends WorkerHost {
  private readonly logger = new Logger(ApiNetworkAssetVerifyQueue.name)
  constructor(private readonly core: ApiCoreService, private readonly sync: ApiNetworkAssetSyncService) {
    super()
  }

  override async process(
    job: Job<ApiNetworkAssetIdentityVerifyPayload, boolean | undefined, string>,
  ): Promise<boolean | undefined> {
    this.logger.debug(`Dequeueing ${job.name} [${job.id}]`)
    await job.updateProgress(0)

    const verified = await this.sync.verifyAsset({ cluster: job.data.cluster, asset: job.data.asset })

    if (verified) {
      await job.log(`Verified asset ${job.data.asset.account}`)
      await this.core.logVerbose(`Verified asset ${job.data.asset.account} `, {})
    } else {
      await job.log(`Asset ${job.data.asset.account} not verified`)
      await this.core.logWarning(`Asset ${job.data.asset.account} not verified`, {})
    }

    return verified
  }
}
