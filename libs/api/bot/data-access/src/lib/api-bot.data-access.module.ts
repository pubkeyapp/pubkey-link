import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiBotDataAdminService } from './api-bot-data-admin.service'
import { ApiBotDataManagerService } from './api-bot-data-manager.service'
import { ApiBotDataUserService } from './api-bot-data-user.service'
import { ApiBotDataService } from './api-bot-data.service'
import { ApiBotMemberService } from './api-bot-member.service'
import { ApiBotService } from './api-bot.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiBotDataAdminService,
    ApiBotDataManagerService,
    ApiBotDataService,
    ApiBotDataUserService,
    ApiBotMemberService,
    ApiBotService,
  ],
  exports: [ApiBotService],
})
export class ApiBotDataAccessModule {}
