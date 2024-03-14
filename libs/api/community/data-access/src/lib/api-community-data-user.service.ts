import { Injectable } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiCommunityDataService } from './api-community-data.service'
import { UserCreateCommunityInput } from './dto/user-create-community.input'
import { UserFindManyCommunityInput } from './dto/user-find-many-community.input'
import { UserUpdateCommunityInput } from './dto/user-update-community.input'
import { CommunityPaging } from './entity/community-paging.entity'
import { getCommunityWhereUserInput } from './helpers/get-community-where-user.input'

@Injectable()
export class ApiCommunityDataUserService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiCommunityDataService) {}

  async createCommunity(userId: string, input: UserCreateCommunityInput) {
    await this.core.ensureUserAdmin(userId)
    return this.data.create(userId, input)
  }

  async deleteCommunity(userId: string, communityId: string) {
    await this.core.ensureCommunityAdmin({ communityId, userId })
    return this.data.delete(communityId)
  }

  async findManyCommunity(userId: string, input: UserFindManyCommunityInput): Promise<CommunityPaging> {
    const user = await this.core.ensureUserById(userId)
    return this.data.findMany({
      orderBy: { name: 'asc' },
      where: getCommunityWhereUserInput(user, input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunity(userId: string, communityId: string) {
    const user = await this.core.ensureUserById(userId)
    return this.core.data.community.findFirst({
      where: {
        id: communityId,
        members: user.role === UserRole.Admin ? undefined : { some: { userId: user.id } },
      },
    })
  }

  async updateCommunity(userId: string, communityId: string, input: UserUpdateCommunityInput) {
    await this.core.ensureCommunityAdmin({ communityId, userId })
    return this.data.update(communityId, input)
  }

  async getCommunities(username: string) {
    return this.data.getCommunities(username)
  }
}
