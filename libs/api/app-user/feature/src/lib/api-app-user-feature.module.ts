import { Module } from '@nestjs/common'
import { ApiAppUserDataAccessModule } from '@pubkey-link/api-app-user-data-access'
import { ApiAdminAppUserResolver } from './api-admin-app-user.resolver'

@Module({
  imports: [ApiAppUserDataAccessModule],
  providers: [ApiAdminAppUserResolver],
})
export class ApiAppUserFeatureModule {}
