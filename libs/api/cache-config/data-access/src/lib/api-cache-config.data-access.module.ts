import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiCacheConfigService } from './api-cache-config.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCacheConfigService],
  exports: [ApiCacheConfigService],
})
export class ApiCacheConfigDataAccessModule {}
