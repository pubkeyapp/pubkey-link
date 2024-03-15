import { Injectable } from '@nestjs/common'
import { ApiCommunityMemberDataService } from './api-community-member-data.service'
import { AdminAddCommunityMemberInput } from './dto/admin-add-community-member-input'
import { AdminFindManyCommunityMemberInput } from './dto/admin-find-many-community-member.input'
import { AdminUpdateCommunityMemberInput } from './dto/admin-update-community-member.input'
import { CommunityMemberPaging } from './entity/community-member.entity'
import { getCommunityMemberWhereAdminInput } from './helpers/get-community-member-where-admin.input'

@Injectable()
export class ApiCommunityMemberDataAdminService {
  constructor(private readonly data: ApiCommunityMemberDataService) {}

  addCommunityMember(communityId: string, input: AdminAddCommunityMemberInput) {
    return this.data.add({ ...input, communityId })
  }

  async removeCommunityMember(communityMemberId: string) {
    return this.data.remove(communityMemberId)
  }

  async findManyCommunityMember(input: AdminFindManyCommunityMemberInput): Promise<CommunityMemberPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getCommunityMemberWhereAdminInput(input),
      include: { user: true },
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunityMember(communityMemberId: string) {
    return this.data.findOne(communityMemberId)
  }

  async updateCommunityMember(communityMemberId: string, input: AdminUpdateCommunityMemberInput) {
    return this.data.update(communityMemberId, input)
  }
}
