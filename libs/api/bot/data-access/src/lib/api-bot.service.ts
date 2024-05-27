import { Injectable } from '@nestjs/common'
import { ApiBotDataAdminService } from './api-bot-data-admin.service'
import { ApiBotDataUserService } from './api-bot-data-user.service'
import { ApiBotInstancesService } from './api-bot-instances.service'

@Injectable()
export class ApiBotService {
  constructor(
    readonly admin: ApiBotDataAdminService,
    readonly instances: ApiBotInstancesService,
    readonly user: ApiBotDataUserService,
  ) {}
}
