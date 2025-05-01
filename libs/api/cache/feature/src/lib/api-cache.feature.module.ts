import { Module } from '@nestjs/common'
import { ApiCacheDataAccessModule } from '@pubkey-link/api-cache-data-access'
import { ApiCacheController } from './api-cache.controller'
import { ApiCacheResolver } from './api-cache.resolver'

@Module({
  controllers: [ApiCacheController],
  imports: [ApiCacheDataAccessModule],
  providers: [ApiCacheResolver],
})
export class ApiCacheFeatureModule {}
