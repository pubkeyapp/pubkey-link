import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiCommunityMemberDataAdminService } from './api-community-member-data-admin.service'
import { ApiCommunityMemberDataUserService } from './api-community-member-data-user.service'
import { ApiCommunityMemberDataService } from './api-community-member-data.service'
import { ApiCommunityMemberService } from './api-community-member.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiCommunityMemberService,
    ApiCommunityMemberDataService,
    ApiCommunityMemberDataAdminService,
    ApiCommunityMemberDataUserService,
  ],
  exports: [ApiCommunityMemberService],
})
export class ApiCommunityMemberDataAccessModule {}
