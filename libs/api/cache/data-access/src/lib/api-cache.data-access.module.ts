import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiNetworkTokenDataAccessModule } from '@pubkey-link/api-network-token-data-access'
import { ApiCacheService } from './api-cache.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNetworkDataAccessModule, ApiNetworkTokenDataAccessModule],
  providers: [ApiCacheService],
  exports: [ApiCacheService],
})
export class ApiCacheDataAccessModule {}
