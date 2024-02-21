import { Injectable } from '@nestjs/common'
import { ApiAdminRoleService } from './api-admin-role.service'
import { ApiRoleResolverService } from './api-role-resolver.service'
import { ApiUserRoleService } from './api-user-role.service'

@Injectable()
export class ApiRoleService {
  constructor(
    readonly admin: ApiAdminRoleService,
    readonly resolver: ApiRoleResolverService,
    readonly user: ApiUserRoleService,
  ) {}
}
