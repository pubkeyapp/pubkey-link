import { Injectable } from '@nestjs/common'
import { ApiAdminRoleService } from './api-admin-role.service'
import { ApiUserRoleService } from './api-user-role.service'

@Injectable()
export class ApiRoleService {
  constructor(readonly admin: ApiAdminRoleService, readonly user: ApiUserRoleService) {}
}
