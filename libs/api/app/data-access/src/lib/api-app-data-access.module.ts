import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAdminAppService } from './api-admin-app.service'
import { ApiAppService } from './api-app.service'
import { ApiUserAppService } from './api-user-app.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAppService, ApiAdminAppService, ApiUserAppService],
  exports: [ApiAppService],
})
export class ApiAppDataAccessModule {}
