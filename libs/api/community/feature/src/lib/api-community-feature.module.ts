import { Module } from '@nestjs/common'
import { ApiCommunityDataAccessModule } from '@pubkey-link/api-community-data-access'
import { ApiAdminCommunityResolver } from './api-admin-community.resolver'
import { ApiAnonCommunityResolver } from './api-anon-community.resolver'
import { ApiCommunityResolver } from './api-community.resolver'
import { ApiUserCommunityResolver } from './api-user-community.resolver'

@Module({
  imports: [ApiCommunityDataAccessModule],
  providers: [ApiCommunityResolver, ApiAdminCommunityResolver, ApiAnonCommunityResolver, ApiUserCommunityResolver],
})
export class ApiCommunityFeatureModule {}
