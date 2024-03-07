import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAdminUserService } from './api-admin-user.service'
import { ApiUserUserService } from './api-user-user.service'
import { ApiUserService } from './api-user.service'
import { ApiUserProvisionService } from './provision/api-user-provision.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserService, ApiAdminUserService, ApiUserProvisionService, ApiUserUserService],
  exports: [ApiUserService],
})
export class ApiUserDataAccessModule {}
