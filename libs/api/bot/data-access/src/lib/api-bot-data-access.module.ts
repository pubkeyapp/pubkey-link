import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiAdminBotService } from './api-admin-bot.service'
import { ApiBotManagerService } from './api-bot-manager.service'
import { ApiBotMemberService } from './api-bot-member.service'
import { ApiBotService } from './api-bot.service'
import { ApiUserBotService } from './api-user-bot.service'
import { API_BOT_MEMBER_ADD, API_BOT_MEMBER_REMOVE } from './helpers/api-bot.constants'
import { ApiBotMemberAddProcessor } from './processors/api-bot-member-add-processor'
import { ApiBotMemberRemoveProcessor } from './processors/api-bot-member-remove-processor'

const processors = [ApiBotMemberAddProcessor, ApiBotMemberRemoveProcessor]

@Module({
  imports: [
    ApiCoreDataAccessModule,
    BullModule.registerQueue({ name: API_BOT_MEMBER_ADD }),
    BullModule.registerQueue({ name: API_BOT_MEMBER_REMOVE }),
    BullBoardModule.forFeature({ name: API_BOT_MEMBER_ADD, adapter: BullMQAdapter }),
    BullBoardModule.forFeature({ name: API_BOT_MEMBER_REMOVE, adapter: BullMQAdapter }),
  ],
  providers: [
    ...processors,
    ApiAdminBotService,
    ApiBotManagerService,
    ApiBotMemberService,
    ApiBotService,
    ApiUserBotService,
  ],
  exports: [ApiBotService],
})
export class ApiBotDataAccessModule {}
