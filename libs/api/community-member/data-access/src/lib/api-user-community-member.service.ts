import { Injectable } from '@nestjs/common'
import { CommunityRole } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { UserAddCommunityMemberInput } from './dto/user-add-community-member-input'
import { UserFindManyCommunityMemberInput } from './dto/user-find-many-community-member.input'
import { UserUpdateCommunityMemberInput } from './dto/user-update-community-member.input'
import { CommunityMemberPaging } from './entity/community-member-paging.entity'
import { getUserCommunityMemberWhereInput } from './helpers/get-user-community-member-where.input'

@Injectable()
export class ApiUserCommunityMemberService {
  constructor(private readonly core: ApiCoreService) {}

  async addCommunityMember(userId: string, communityId: string, input: UserAddCommunityMemberInput) {
    await this.core.ensureCommunityAdmin({ communityId, userId })

    return this.core.data.communityMember.create({ data: { ...input, communityId } })
  }

  async removeCommunityMember(userId: string, communityMemberId: string) {
    const { role } = await this.ensureCommunityMemberAccess({ communityMemberId, userId })
    if (role !== CommunityRole.Admin) {
      throw new Error('Community member not found')
    }
    const deleted = await this.core.data.communityMember.delete({ where: { id: communityMemberId } })
    return !!deleted
  }

  async findManyCommunityMember(
    userId: string,
    input: UserFindManyCommunityMemberInput,
  ): Promise<CommunityMemberPaging> {
    await this.core.ensureCommunityAccess({ userId, communityId: input.communityId })
    return this.core.data.communityMember
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserCommunityMemberWhereInput(input),
        include: { user: true, roles: { include: { role: true } } },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCommunityMember(userId: string, communityMemberId: string) {
    const { member } = await this.ensureCommunityMemberAccess({ communityMemberId, userId })

    return member
  }

  async updateCommunityMember(userId: string, communityMemberId: string, input: UserUpdateCommunityMemberInput) {
    const { role } = await this.ensureCommunityMemberAccess({ communityMemberId, userId })
    if (role !== CommunityRole.Admin) {
      throw new Error('Community member not found')
    }
    return this.core.data.communityMember.update({ where: { id: communityMemberId }, data: input })
  }

  private async ensureCommunityMemberAccess({
    communityMemberId,
    userId,
  }: {
    communityMemberId: string
    userId: string
  }) {
    // Find the community member object
    const member = await this.core.data.communityMember.findUnique({ where: { id: communityMemberId } })
    if (!member) {
      throw new Error('Community member not found')
    }
    // If found, ensure the user has access to the community
    const role = await this.core.ensureCommunityAccess({ userId, communityId: member.communityId })
    return {
      member,
      role,
    }
  }

  async getCommunityRole({ communityId, userId }: { communityId: string; userId: string }) {
    return this.core.data.communityMember
      .findUnique({
        where: { communityId_userId: { communityId, userId } },
        select: { role: true },
      })
      .then((member) => member?.role)
  }
}
