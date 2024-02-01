import { Injectable } from '@nestjs/common'
import { ApiUserLogService } from './api-user-log.service'
import { ApiAdminLogService } from './api-admin-log.service'

@Injectable()
export class ApiLogService {
  // Use the following command to generate the CRUD for this service for a certain actor
  // nx g api-crud --app Api --model log --actor <admin|user|etc...>
  constructor(readonly user: ApiUserLogService, readonly admin: ApiAdminLogService) {}
}
