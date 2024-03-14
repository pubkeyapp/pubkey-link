import { Injectable } from '@nestjs/common'
import { ApiUserDataAdminService } from './api-user-data-admin.service'
import { ApiUserDataUserService } from './api-user-data-user.service'

@Injectable()
export class ApiUserService {
  constructor(readonly admin: ApiUserDataAdminService, readonly user: ApiUserDataUserService) {}
}
