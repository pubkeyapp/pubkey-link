import { Module } from '@nestjs/common'
import { ApiBotDataAccessModule } from '@pubkey-link/api-bot-data-access'
import { ApiAdminBotResolver } from './api-admin-bot.resolver'
import { ApiBotRoleResolver } from './api-bot-role-resolver'
import { ApiBotResolver } from './api-bot.resolver'
import { ApiUserBotResolver } from './api-user-bot.resolver'

@Module({
  imports: [ApiBotDataAccessModule],
  providers: [ApiBotResolver, ApiBotRoleResolver, ApiAdminBotResolver, ApiUserBotResolver],
})
export class ApiBotFeatureModule {}
