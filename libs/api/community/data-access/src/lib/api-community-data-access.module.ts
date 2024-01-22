import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiCommunityService } from './api-community.service'
import { ApiAdminCommunityService } from './api-admin-community.service'
import { ApiUserCommunityService } from './api-user-community.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCommunityService, ApiAdminCommunityService, ApiUserCommunityService],
  exports: [ApiCommunityService],
})
export class ApiCommunityDataAccessModule {}
