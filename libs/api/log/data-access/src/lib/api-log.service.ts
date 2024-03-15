import { Injectable } from '@nestjs/common'
import { ApiLogDataAdminService } from './api-log-data-admin.service'
import { ApiLogDataUserService } from './api-log-data-user.service'

@Injectable()
export class ApiLogService {
  constructor(readonly user: ApiLogDataUserService, readonly admin: ApiLogDataAdminService) {}
}
