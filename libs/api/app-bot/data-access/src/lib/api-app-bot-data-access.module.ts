import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAdminAppBotService } from './api-admin-app-bot.service'

import { ApiAppBotService } from './api-app-bot.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAppBotService, ApiAdminAppBotService],
  exports: [ApiAppBotService],
})
export class ApiAppBotDataAccessModule {}
