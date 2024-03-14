import { Injectable } from '@nestjs/common'
import { ApiRoleDataAdminService } from './api-role-data-admin.service'
import { ApiRoleDataUserService } from './api-role-data-user.service'
import { ApiRoleResolverService } from './api-role-resolver.service'

@Injectable()
export class ApiRoleService {
  constructor(
    readonly admin: ApiRoleDataAdminService,
    readonly resolver: ApiRoleResolverService,
    readonly user: ApiRoleDataUserService,
  ) {}
}
