import { Injectable } from '@nestjs/common'
import { ApiAdminLogService } from './api-admin-log.service'
import { ApiUserLogService } from './api-user-log.service'

@Injectable()
export class ApiLogService {
  constructor(readonly user: ApiUserLogService, readonly admin: ApiAdminLogService) {}
}
