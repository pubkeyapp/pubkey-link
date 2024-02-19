import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { UserCreateCommunityInput } from './dto/user-create-community.input'
import { UserFindManyCommunityInput } from './dto/user-find-many-community.input'
import { UserUpdateCommunityInput } from './dto/user-update-community.input'
import { CommunityPaging } from './entity/community-paging.entity'
import { getUserCommunityWhereInput } from './helpers/get-user-community-where.input'

@Injectable()
export class ApiUserCommunityService {
  constructor(private readonly core: ApiCoreService) {}

  async createCommunity(userId: string, input: UserCreateCommunityInput) {
    await this.core.ensureUserAdmin(userId)
    return this.core.createCommunity({ userId, input })
  }

  async deleteCommunity(userId: string, communityId: string) {
    await this.core.ensureCommunityAdmin({ communityId, userId })
    const deleted = await this.core.data.community.delete({ where: { id: communityId } })
    return !!deleted
  }

  async findManyCommunity(userId: string, input: UserFindManyCommunityInput): Promise<CommunityPaging> {
    const user = await this.core.ensureUserById(userId)
    return this.core.data.community
      .paginate({
        orderBy: { name: 'asc' },
        where: getUserCommunityWhereInput(user, input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCommunity(userId: string, communityId: string) {
    const user = await this.core.ensureUserById(userId)
    return this.core.data.community.findFirst({
      where: {
        id: communityId,
        members: { some: { userId: user.id } },
      },
    })
  }

  async updateCommunity(userId: string, communityId: string, input: UserUpdateCommunityInput) {
    await this.core.ensureCommunityAdmin({ communityId, userId })
    return this.core.data.community.update({ where: { id: communityId }, data: input })
  }

  async getCommunities(username: string) {
    return this.core.data.community.findMany({
      where: {
        roles: {
          some: { members: { some: { member: { user: { username } } } } },
        },
      },
      include: {
        roles: {
          where: { members: { some: { member: { user: { username } } } } },
          include: { conditions: { include: { token: true } } },
          orderBy: { name: 'asc' },
        },
      },
    })
  }
}
