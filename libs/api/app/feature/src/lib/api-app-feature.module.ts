import { Module } from '@nestjs/common'
import { ApiAppDataAccessModule } from '@pubkey-link/api-app-data-access'
import { ApiAdminAppResolver } from './api-admin-app.resolver'

@Module({
  imports: [ApiAppDataAccessModule],
  providers: [ApiAdminAppResolver],
})
export class ApiAppFeatureModule {}
