import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminFindManyCommunityMemberInput } from './dto/admin-find-many-community-member.input'
import { AdminUpdateCommunityMemberInput } from './dto/admin-update-community-member.input'
import { CommunityMemberPaging } from './entity/community-member-paging.entity'
import { getAdminCommunityMemberWhereInput } from './helpers/get-admin-community-member-where.input'

@Injectable()
export class ApiAdminCommunityMemberService {
  constructor(private readonly core: ApiCoreService) {}

  async deleteCommunityMember(communityMemberId: string) {
    const deleted = await this.core.data.communityMember.delete({ where: { id: communityMemberId } })
    return !!deleted
  }

  async findManyCommunityMember(input: AdminFindManyCommunityMemberInput): Promise<CommunityMemberPaging> {
    return this.core.data.communityMember
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminCommunityMemberWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCommunityMember(communityMemberId: string) {
    return this.core.data.communityMember.findUnique({ where: { id: communityMemberId } })
  }

  async updateCommunityMember(communityMemberId: string, input: AdminUpdateCommunityMemberInput) {
    return this.core.data.communityMember.update({ where: { id: communityMemberId }, data: input })
  }
}
