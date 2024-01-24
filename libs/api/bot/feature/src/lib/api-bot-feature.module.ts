import { Module } from '@nestjs/common'
import { ApiBotDataAccessModule } from '@pubkey-link/api-bot-data-access'
import { ApiBotResolver } from './api-bot.resolver'
import { ApiAdminBotResolver } from './api-admin-bot.resolver'
import { ApiUserBotResolver } from './api-user-bot.resolver'
import { ApiBotPermissionResolver } from './api-bot-permission.resolver'

@Module({
  imports: [ApiBotDataAccessModule],
  providers: [ApiBotResolver, ApiBotPermissionResolver, ApiAdminBotResolver, ApiUserBotResolver],
})
export class ApiBotFeatureModule {}
