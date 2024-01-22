import { Module } from '@nestjs/common'
import { ApiCommunityDataAccessModule } from '@pubkey-link/api-community-data-access'
import { ApiCommunityResolver } from './api-community.resolver'
import { ApiAdminCommunityResolver } from './api-admin-community.resolver'
import { ApiUserCommunityResolver } from './api-user-community.resolver'

@Module({
  imports: [ApiCommunityDataAccessModule],
  providers: [ApiCommunityResolver, ApiAdminCommunityResolver, ApiUserCommunityResolver],
})
export class ApiCommunityFeatureModule {}
