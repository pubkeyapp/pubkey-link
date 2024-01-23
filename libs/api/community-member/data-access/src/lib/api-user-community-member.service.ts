import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { UserCreateCommunityMemberInput } from './dto/user-create-community-member.input'
import { UserFindManyCommunityMemberInput } from './dto/user-find-many-community-member.input'
import { UserUpdateCommunityMemberInput } from './dto/user-update-community-member.input'
import { CommunityMemberPaging } from './entity/community-member-paging.entity'
import { getUserCommunityMemberWhereInput } from './helpers/get-user-community-member-where.input'

@Injectable()
export class ApiUserCommunityMemberService {
  constructor(private readonly core: ApiCoreService) {}

  async createCommunityMember(input: UserCreateCommunityMemberInput) {
    return this.core.data.communityMember.create({ data: input })
  }

  async deleteCommunityMember(communityMemberId: string) {
    const deleted = await this.core.data.communityMember.delete({ where: { id: communityMemberId } })
    return !!deleted
  }

  async findManyCommunityMember(input: UserFindManyCommunityMemberInput): Promise<CommunityMemberPaging> {
    return this.core.data.communityMember
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserCommunityMemberWhereInput(input),
        include: { user: true },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCommunityMember(communityMemberId: string) {
    return this.core.data.communityMember.findUnique({ where: { id: communityMemberId } })
  }

  async updateCommunityMember(communityMemberId: string, input: UserUpdateCommunityMemberInput) {
    return this.core.data.communityMember.update({ where: { id: communityMemberId }, data: input })
  }
}
