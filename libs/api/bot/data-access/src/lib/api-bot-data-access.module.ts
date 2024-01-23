import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiBotService } from './api-bot.service'
import { ApiAdminBotService } from './api-admin-bot.service'
import { ApiUserBotService } from './api-user-bot.service'
import { ApiBotManagerService } from './api-bot-manager.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiBotService, ApiAdminBotService, ApiBotManagerService, ApiUserBotService],
  exports: [ApiBotService],
})
export class ApiBotDataAccessModule {}
