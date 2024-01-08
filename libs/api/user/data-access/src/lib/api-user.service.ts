import { Injectable } from '@nestjs/common'
import { ApiUserUserService } from './api-user-user.service'
import { ApiAdminUserService } from './api-admin-user.service'

@Injectable()
export class ApiUserService {
  constructor(readonly admin: ApiAdminUserService, readonly user: ApiUserUserService) {}
}
