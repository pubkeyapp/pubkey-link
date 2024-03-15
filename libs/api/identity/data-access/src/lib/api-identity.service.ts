import { Injectable } from '@nestjs/common'

import { ApiIdentityDataAdminService } from './api-identity-data-admin.service'
import { ApiIdentityDataAnonService } from './api-identity-data-anon.service'
import { ApiIdentityDataUserService } from './api-identity-data-user.service'

@Injectable()
export class ApiIdentityService {
  constructor(
    readonly admin: ApiIdentityDataAdminService,
    readonly anon: ApiIdentityDataAnonService,
    readonly user: ApiIdentityDataUserService,
  ) {}
}
