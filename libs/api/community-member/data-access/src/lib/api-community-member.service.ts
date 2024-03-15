import { Injectable } from '@nestjs/common'
import { ApiCommunityMemberDataAdminService } from './api-community-member-data-admin.service'
import { ApiCommunityMemberDataUserService } from './api-community-member-data-user.service'

@Injectable()
export class ApiCommunityMemberService {
  constructor(readonly admin: ApiCommunityMemberDataAdminService, readonly user: ApiCommunityMemberDataUserService) {}
}
