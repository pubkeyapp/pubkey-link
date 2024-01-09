import { Injectable } from '@nestjs/common'
import { ApiAdminAppService } from './api-admin-app.service'
import { ApiUserAppService } from './api-user-app.service'

@Injectable()
export class ApiAppService {
  constructor(readonly admin: ApiAdminAppService, readonly user: ApiUserAppService) {}
}
