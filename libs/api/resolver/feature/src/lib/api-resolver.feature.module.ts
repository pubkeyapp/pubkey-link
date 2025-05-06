import { Module } from '@nestjs/common'
import { ApiResolverDataAccessModule } from '@pubkey-link/api-resolver-data-access'
import { ApiResolverResolver } from './api-resolver.resolver'
import { ApiResolverAdminResolver } from './api-resolver-admin.resolver'

@Module({
  imports: [ApiResolverDataAccessModule],
  providers: [ApiResolverResolver, ApiResolverAdminResolver],
})
export class ApiResolverFeatureModule {}
