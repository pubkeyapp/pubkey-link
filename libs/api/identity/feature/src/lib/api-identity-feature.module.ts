import { Module } from '@nestjs/common'
import { ApiIdentityDataAccessModule } from '@pubkey-link/api-identity-data-access'
import { ApiAdminIdentityResolver } from './api-admin-identity.resolver'
import { ApiIdentityResolver } from './api-identity.resolver'
import { ApiUserIdentityResolver } from './api-user-identity.resolver'
import { ApiAnonIdentityResolver } from './api-anon-identity.resolver'

@Module({
  imports: [ApiIdentityDataAccessModule],
  providers: [ApiAdminIdentityResolver, ApiAnonIdentityResolver, ApiIdentityResolver, ApiUserIdentityResolver],
})
export class ApiIdentityFeatureModule {}
