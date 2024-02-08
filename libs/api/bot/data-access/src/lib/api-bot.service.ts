import { Injectable } from '@nestjs/common'
import { ApiAdminBotService } from './api-admin-bot.service'
import { ApiBotManagerService } from './api-bot-manager.service'
import { ApiBotMemberService } from './api-bot-member.service'
import { ApiUserBotService } from './api-user-bot.service'

@Injectable()
export class ApiBotService {
  constructor(
    readonly manager: ApiBotManagerService,
    readonly member: ApiBotMemberService,
    readonly admin: ApiAdminBotService,
    readonly user: ApiUserBotService,
  ) {}
}
