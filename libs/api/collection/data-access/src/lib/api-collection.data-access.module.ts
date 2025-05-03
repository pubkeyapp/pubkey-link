import { Module } from '@nestjs/common'
import { ApiCacheDataAccessModule } from '@pubkey-link/api-cache-data-access'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiCollectionService } from './api-collection.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiCacheDataAccessModule],
  providers: [ApiCollectionService],
  exports: [ApiCollectionService],
})
export class ApiCollectionDataAccessModule {}
