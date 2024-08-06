import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiBotCommandsService } from './api-bot-commands.service'
import { ApiBotDataAdminService } from './api-bot-data-admin.service'
import { ApiBotDataUserService } from './api-bot-data-user.service'
import { ApiBotDataService } from './api-bot-data.service'
import { ApiBotInstancesService } from './api-bot-instances.service'
import { ApiBotSyncService } from './api-bot-sync.service'
import { ApiBotService } from './api-bot.service'
import { API_BOT_ADD_ROLE_QUEUE, API_BOT_REMOVE_ROLE_QUEUE } from './helpers/api-bot.constants'
import { ApiBotAddRoleQueue } from './processors/api-bot-add-role.queue'
import { ApiBotRemoveRoleQueue } from './processors/api-bot-remove-role.queue'

const processors = [ApiBotAddRoleQueue, ApiBotRemoveRoleQueue]

@Module({
  imports: [
    ApiCoreDataAccessModule,
    BullModule.registerQueue({ name: API_BOT_ADD_ROLE_QUEUE }),
    BullModule.registerQueue({ name: API_BOT_REMOVE_ROLE_QUEUE }),
    BullBoardModule.forFeature({ name: API_BOT_ADD_ROLE_QUEUE, adapter: BullMQAdapter }),
    BullBoardModule.forFeature({ name: API_BOT_REMOVE_ROLE_QUEUE, adapter: BullMQAdapter }),
  ],
  providers: [
    ApiBotCommandsService,
    ApiBotDataAdminService,
    ApiBotDataService,
    ApiBotDataUserService,
    ApiBotInstancesService,
    ApiBotService,
    ApiBotSyncService,
    ...processors,
  ],
  exports: [ApiBotService],
})
export class ApiBotDataAccessModule {}
