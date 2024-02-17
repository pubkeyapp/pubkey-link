import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAdminBotService } from './api-admin-bot.service'
import { ApiBotManagerService } from './api-bot-manager.service'
import { ApiBotMemberService } from './api-bot-member.service'
import { ApiBotService } from './api-bot.service'
import { ApiUserBotService } from './api-user-bot.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAdminBotService, ApiBotManagerService, ApiBotMemberService, ApiBotService, ApiUserBotService],
  exports: [ApiBotService],
})
export class ApiBotDataAccessModule {}
