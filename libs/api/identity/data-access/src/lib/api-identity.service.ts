import { Injectable } from '@nestjs/common'

import { ApiAdminIdentityService } from './api-admin-identity.service'
import { ApiUserIdentityService } from './api-user-identity.service'
import { ApiAnonIdentityService } from './api-anon-identity.service'

@Injectable()
export class ApiIdentityService {
  constructor(
    readonly admin: ApiAdminIdentityService,
    readonly anon: ApiAnonIdentityService,
    readonly user: ApiUserIdentityService,
  ) {}
}
