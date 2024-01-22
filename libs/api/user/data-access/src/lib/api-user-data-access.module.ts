import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAdminUserService } from './api-admin-user.service'
import { ApiUserUserService } from './api-user-user.service'
import { ApiUserService } from './api-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserService, ApiAdminUserService, ApiUserUserService],
  exports: [ApiUserService],
})
export class ApiUserDataAccessModule {}
