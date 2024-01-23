import { Injectable } from '@nestjs/common'
import { ApiAdminBotService } from './api-admin-bot.service'
import { ApiUserBotService } from './api-user-bot.service'
import { ApiBotManagerService } from './api-bot-manager.service'

@Injectable()
export class ApiBotService {
  constructor(
    readonly manager: ApiBotManagerService,
    readonly admin: ApiAdminBotService,
    readonly user: ApiUserBotService,
  ) {}
}
