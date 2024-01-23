import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiCommunityMemberService } from './api-community-member.service'
import { ApiAdminCommunityMemberService } from './api-admin-community-member.service'
import { ApiUserCommunityMemberService } from './api-user-community-member.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCommunityMemberService, ApiAdminCommunityMemberService, ApiUserCommunityMemberService],
  exports: [ApiCommunityMemberService],
})
export class ApiCommunityMemberDataAccessModule {}
