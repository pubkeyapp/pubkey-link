import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiTeamService } from './api-team.service'
import { ApiTeamDataService } from './api-team-data.service'
import { ApiTeamDataAdminService } from './api-team-data-admin.service'
import { ApiTeamDataUserService } from './api-team-data-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTeamService, ApiTeamDataService, ApiTeamDataAdminService, ApiTeamDataUserService],
  exports: [ApiTeamService],
})
export class ApiTeamDataAccessModule {}
