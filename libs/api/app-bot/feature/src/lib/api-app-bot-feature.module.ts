import { Module } from '@nestjs/common'
import { ApiAppBotDataAccessModule } from '@pubkey-link/api-app-bot-data-access'
import { ApiAdminAppBotResolver } from './api-admin-app-bot.resolver'

@Module({
  imports: [ApiAppBotDataAccessModule],
  providers: [ApiAdminAppBotResolver],
})
export class ApiAppBotFeatureModule {}
