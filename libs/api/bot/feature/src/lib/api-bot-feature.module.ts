import { Module } from '@nestjs/common'
import { ApiBotDataAccessModule } from '@pubkey-link/api-bot-data-access'
import { ApiBotResolver } from './api-bot.resolver'
import { ApiAdminBotResolver } from './api-admin-bot.resolver'
import { ApiUserBotResolver } from './api-user-bot.resolver'

@Module({
  imports: [ApiBotDataAccessModule],
  providers: [ApiBotResolver, ApiAdminBotResolver, ApiUserBotResolver],
})
export class ApiBotFeatureModule {}
