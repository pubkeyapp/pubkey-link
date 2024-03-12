import { Module } from '@nestjs/common'
import { ApiTeamDataAccessModule } from '@pubkey-link/api-team-data-access'
import { ApiTeamResolver } from './api-team.resolver'
import { ApiTeamAdminResolver } from './api-team-admin.resolver'
import { ApiTeamUserResolver } from './api-team-user.resolver'

@Module({
  imports: [ApiTeamDataAccessModule],
  providers: [ApiTeamResolver, ApiTeamAdminResolver, ApiTeamUserResolver],
})
export class ApiTeamFeatureModule {}
