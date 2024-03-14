import { Module } from '@nestjs/common'
import { ApiCommunityMemberDataAccessModule } from '@pubkey-link/api-community-member-data-access'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiCommunityDataAdminService } from './api-community-data-admin.service'
import { ApiCommunityDataAnonService } from './api-community-data-anon.service'
import { ApiCommunityDataUserService } from './api-community-data-user.service'
import { ApiCommunityDataService } from './api-community-data.service'
import { ApiCommunityService } from './api-community.service'
import { ApiCommunityProvisionService } from './provision/api-community-provision.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiCommunityMemberDataAccessModule],
  providers: [
    ApiCommunityDataAdminService,
    ApiCommunityDataAnonService,
    ApiCommunityDataService,
    ApiCommunityDataUserService,
    ApiCommunityProvisionService,
    ApiCommunityService,
  ],
  exports: [ApiCommunityService],
})
export class ApiCommunityDataAccessModule {}
