import { Injectable } from '@nestjs/common'
import { ApiBotDataAdminService } from './api-bot-data-admin.service'
import { ApiBotDataManagerService } from './api-bot-data-manager.service'
import { ApiBotDataUserService } from './api-bot-data-user.service'
import { ApiBotMemberService } from './api-bot-member.service'

@Injectable()
export class ApiBotService {
  constructor(
    readonly manager: ApiBotDataManagerService,
    readonly member: ApiBotMemberService,
    readonly admin: ApiBotDataAdminService,
    readonly user: ApiBotDataUserService,
  ) {}
}
