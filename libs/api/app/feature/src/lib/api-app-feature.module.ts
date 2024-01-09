import { Module } from '@nestjs/common'
import { ApiAppDataAccessModule } from '@pubkey-link/api-app-data-access'
import { ApiAdminAppResolver } from './api-admin-app.resolver'
import { ApiAppResolver } from './api-app.resolver'
import { ApiUserAppResolver } from './api-user-app.resolver'

@Module({
  imports: [ApiAppDataAccessModule],
  providers: [ApiAdminAppResolver, ApiAppResolver, ApiUserAppResolver],
})
export class ApiAppFeatureModule {}
