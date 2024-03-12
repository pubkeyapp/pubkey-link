import { Injectable } from '@nestjs/common'
import { ApiTeamDataService } from './api-team-data.service'
import { ApiTeamDataAdminService } from './api-team-data-admin.service'
import { ApiTeamDataUserService } from './api-team-data-user.service'

@Injectable()
export class ApiTeamService {
  constructor(
    readonly data: ApiTeamDataService,
    readonly admin: ApiTeamDataAdminService,
    readonly user: ApiTeamDataUserService,
  ) {}
}
