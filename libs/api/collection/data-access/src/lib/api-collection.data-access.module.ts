import { Module } from '@nestjs/common'
import { ApiCacheDataAccessModule } from '@pubkey-link/api-cache-data-access'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiCollectionService } from './api-collection.service'
import { ApiCollectionAssetService } from './api-collection-assets.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiCacheDataAccessModule],
  providers: [ApiCollectionService, ApiCollectionAssetService],
  exports: [ApiCollectionService, ApiCollectionAssetService],
})
export class ApiCollectionDataAccessModule {}
