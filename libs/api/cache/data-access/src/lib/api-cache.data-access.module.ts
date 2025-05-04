import { Module } from '@nestjs/common'
import { ApiCacheConfigDataAccessModule } from '@pubkey-link/api-cache-config-data-access'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetDataAccessModule } from '@pubkey-link/api-network-asset-data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiNetworkTokenDataAccessModule } from '@pubkey-link/api-network-token-data-access'
import { ApiCacheService } from './api-cache.service'

@Module({
  imports: [
    ApiCacheConfigDataAccessModule,
    ApiCoreDataAccessModule,
    ApiNetworkDataAccessModule,
    ApiNetworkAssetDataAccessModule,
    ApiNetworkTokenDataAccessModule,
  ],
  providers: [ApiCacheService],
  exports: [ApiCacheService],
})
export class ApiCacheDataAccessModule {}
