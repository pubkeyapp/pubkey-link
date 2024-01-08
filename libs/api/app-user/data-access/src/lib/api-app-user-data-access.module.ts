import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAdminAppUserService } from './api-admin-app-user.service'

import { ApiAppUserService } from './api-app-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAppUserService, ApiAdminAppUserService],
  exports: [ApiAppUserService],
})
export class ApiAppUserDataAccessModule {}
