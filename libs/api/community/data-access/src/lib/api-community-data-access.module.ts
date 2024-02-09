import { Module } from '@nestjs/common'
import { ApiCommunityMemberDataAccessModule } from '@pubkey-link/api-community-member-data-access'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAdminCommunityService } from './api-admin-community.service'
import { ApiCommunityService } from './api-community.service'
import { ApiUserCommunityService } from './api-user-community.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiCommunityMemberDataAccessModule],
  providers: [ApiAdminCommunityService, ApiCommunityService, ApiUserCommunityService],
  exports: [ApiCommunityService],
})
export class ApiCommunityDataAccessModule {}
