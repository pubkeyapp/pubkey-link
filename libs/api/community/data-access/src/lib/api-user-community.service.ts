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

  async createCommunity(input: UserCreateCommunityInput) {
    return this.core.data.community.create({ data: input })
  }

  async deleteCommunity(communityId: string) {
    const deleted = await this.core.data.community.delete({ where: { id: communityId } })
    return !!deleted
  }

  async findManyCommunity(input: UserFindManyCommunityInput): Promise<CommunityPaging> {
    return this.core.data.community
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserCommunityWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCommunity(communityId: string) {
    return this.core.data.community.findUnique({ where: { id: communityId } })
  }

  async updateCommunity(communityId: string, input: UserUpdateCommunityInput) {
    return this.core.data.community.update({ where: { id: communityId }, data: input })
  }
}
