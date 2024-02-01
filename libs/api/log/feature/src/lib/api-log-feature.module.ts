import { Module } from '@nestjs/common'
import { ApiLogDataAccessModule } from '@pubkey-link/api-log-data-access'
import { ApiLogResolver } from './api-log.resolver'
import { ApiUserLogResolver } from './api-user-log.resolver'
import { ApiAdminLogResolver } from './api-admin-log.resolver'

@Module({
  imports: [ApiLogDataAccessModule],
  providers: [ApiLogResolver, ApiUserLogResolver, ApiAdminLogResolver],
})
export class ApiLogFeatureModule {}
