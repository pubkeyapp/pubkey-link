import { Injectable } from '@nestjs/common'
import { ApiAdminCommunityMemberService } from './api-admin-community-member.service'
import { ApiUserCommunityMemberService } from './api-user-community-member.service'

@Injectable()
export class ApiCommunityMemberService {
  // Use the following command to generate the CRUD for this service for a certain actor
  // nx g api-crud --app Api --model community-member --actor <admin|user|etc...>
  constructor(readonly admin: ApiAdminCommunityMemberService, readonly user: ApiUserCommunityMemberService) {}
}
