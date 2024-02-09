import { Injectable } from '@nestjs/common'
import { ApiAdminCommunityMemberService } from './api-admin-community-member.service'
import { ApiUserCommunityMemberService } from './api-user-community-member.service'

@Injectable()
export class ApiCommunityMemberService {
  constructor(readonly admin: ApiAdminCommunityMemberService, readonly user: ApiUserCommunityMemberService) {}
}
