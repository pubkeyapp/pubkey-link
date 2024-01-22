import { ApiUserDataAccessModule } from '@pubkey-link/api-user-data-access'
import { Module } from '@nestjs/common'
import { ApiAdminUserResolver } from './api-admin-user.resolver'
import { ApiUserResolver } from './api-user.resolver'
import { ApiUserUserResolver } from './api-user-user.resolver'

@Module({
  imports: [ApiUserDataAccessModule],
  providers: [ApiUserResolver, ApiAdminUserResolver, ApiUserUserResolver],
})
export class ApiUserFeatureModule {}
