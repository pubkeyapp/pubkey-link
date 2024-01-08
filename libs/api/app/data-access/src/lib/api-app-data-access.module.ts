import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAdminAppService } from './api-admin-app.service'

import { ApiAppService } from './api-app.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAppService, ApiAdminAppService],
  exports: [ApiAppService],
})
export class ApiAppDataAccessModule {}
