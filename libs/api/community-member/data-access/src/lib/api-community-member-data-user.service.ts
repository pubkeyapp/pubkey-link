import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiCommunityMemberDataService } from './api-community-member-data.service'
import { UserAddCommunityMemberInput } from './dto/user-add-community-member-input'
import { UserFindManyCommunityMemberInput } from './dto/user-find-many-community-member.input'
import { UserUpdateCommunityMemberInput } from './dto/user-update-community-member.input'
import { CommunityMemberPaging } from './entity/community-member.entity'
import { getCommunityMemberWhereUserInput } from './helpers/get-community-member-where-user.input'

@Injectable()
export class ApiCommunityMemberDataUserService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiCommunityMemberDataService) {}

  async addCommunityMember(userId: string, communityId: string, input: UserAddCommunityMemberInput) {
    await this.core.ensureCommunityAdmin({ communityId, userId })

    return this.data.add({ ...input, communityId })
  }

  async removeCommunityMember(userId: string, communityMemberId: string) {
    await this.data.ensureCommunityMemberAdmin({ communityMemberId, userId })
    return this.data.remove(communityMemberId)
  }

  async findManyCommunityMember(
    userId: string,
    input: UserFindManyCommunityMemberInput,
  ): Promise<CommunityMemberPaging> {
    await this.core.ensureCommunityAccess({ userId, communityId: input.communityId })
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getCommunityMemberWhereUserInput(input),
      include: { user: true, roles: { include: { role: true } } },
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunityMember(userId: string, communityMemberId: string) {
    const { member } = await this.data.ensureCommunityMemberAccess({ communityMemberId, userId })

    return member
  }

  async updateCommunityMember(userId: string, communityMemberId: string, input: UserUpdateCommunityMemberInput) {
    await this.data.ensureCommunityMemberAdmin({ communityMemberId, userId })
    return this.data.update(communityMemberId, input)
  }

  async getCommunityRole({ communityId, userId }: { communityId: string; userId: string }) {
    return this.data.getRole({ communityId, userId })
  }
}
