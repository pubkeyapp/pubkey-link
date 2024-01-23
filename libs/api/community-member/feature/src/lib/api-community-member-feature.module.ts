import { Module } from '@nestjs/common'
import { ApiCommunityMemberDataAccessModule } from '@pubkey-link/api-community-member-data-access'
import { ApiCommunityMemberResolver } from './api-community-member.resolver'
import { ApiAdminCommunityMemberResolver } from './api-admin-community-member.resolver'
import { ApiUserCommunityMemberResolver } from './api-user-community-member.resolver'

@Module({
  imports: [ApiCommunityMemberDataAccessModule],
  providers: [ApiCommunityMemberResolver, ApiAdminCommunityMemberResolver, ApiUserCommunityMemberResolver],
})
export class ApiCommunityMemberFeatureModule {}
