import { Injectable } from '@nestjs/common'
import { ApiAdminCommunityService } from './api-admin-community.service'
import { ApiUserCommunityService } from './api-user-community.service'

@Injectable()
export class ApiCommunityService {
  constructor(readonly admin: ApiAdminCommunityService, readonly user: ApiUserCommunityService) {}
}
