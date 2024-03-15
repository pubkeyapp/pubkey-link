import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiNetworkAssetDataAdminService } from './api-network-asset-data-admin.service'
import { ApiNetworkAssetDataUserService } from './api-network-asset-data-user.service'
import { ApiNetworkAssetDataService } from './api-network-asset-data.service'
import { ApiNetworkAssetSyncService } from './api-network-asset-sync.service'
import { ApiNetworkAssetService } from './api-network-asset.service'
import {
  API_NETWORK_ASSET_SYNC,
  API_NETWORK_ASSET_UPSERT_FLOW,
  API_NETWORK_ASSET_UPSERT_QUEUE,
} from './helpers/api-network-asset.constants'
import { ApiNetworkAssetSyncQueue } from './processors/api-network-asset-sync-queue'
import { ApiNetworkAssetUpsertQueue } from './processors/api-network-asset-upsert-queue'

const processors = [ApiNetworkAssetSyncQueue, ApiNetworkAssetUpsertQueue]

@Module({
  imports: [
    ApiCoreDataAccessModule,
    ApiNetworkDataAccessModule,
    BullModule.registerQueue({ name: API_NETWORK_ASSET_SYNC }),
    BullModule.registerQueue({ name: API_NETWORK_ASSET_UPSERT_QUEUE }),
    BullModule.registerFlowProducer({ name: API_NETWORK_ASSET_UPSERT_FLOW }),
    BullBoardModule.forFeature({ name: API_NETWORK_ASSET_SYNC, adapter: BullMQAdapter }),
    BullBoardModule.forFeature({ name: API_NETWORK_ASSET_UPSERT_QUEUE, adapter: BullMQAdapter }),
  ],
  providers: [
    ApiNetworkAssetService,
    ApiNetworkAssetSyncService,
    ApiNetworkAssetDataUserService,
    ApiNetworkAssetDataService,
    ApiNetworkAssetDataAdminService,
    ...processors,
  ],
  exports: [ApiNetworkAssetService],
})
export class ApiNetworkAssetDataAccessModule {}
