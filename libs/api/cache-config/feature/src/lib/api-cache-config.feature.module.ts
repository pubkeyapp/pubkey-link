import { Module } from '@nestjs/common'
import { ApiCacheConfigDataAccessModule } from '@pubkey-link/api-cache-config-data-access'
import { ApiCacheConfigAdminResolver } from './api-cache-config-admin.resolver'
import { ApiCacheConfigResolver } from './api-cache-config.resolver'

@Module({
  imports: [ApiCacheConfigDataAccessModule],
  providers: [ApiCacheConfigResolver, ApiCacheConfigAdminResolver],
})
export class ApiCacheConfigFeatureModule {}
