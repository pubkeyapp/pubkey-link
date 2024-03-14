import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiUserDataAdminService } from './api-user-data-admin.service'
import { ApiUserDataUserService } from './api-user-data-user.service'
import { ApiUserDataService } from './api-user-data.service'
import { ApiUserService } from './api-user.service'
import { ApiUserProvisionService } from './provision/api-user-provision.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiUserService,
    ApiUserDataService,
    ApiUserDataAdminService,
    ApiUserProvisionService,
    ApiUserDataUserService,
  ],
  exports: [ApiUserService],
})
export class ApiUserDataAccessModule {}
