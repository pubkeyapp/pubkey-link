import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminCreateCommunityInput } from './dto/admin-create-community.input'
import { AdminFindManyCommunityInput } from './dto/admin-find-many-community.input'
import { AdminUpdateCommunityInput } from './dto/admin-update-community.input'
import { CommunityPaging } from './entity/community-paging.entity'
import { getAdminCommunityWhereInput } from './helpers/get-admin-community-where.input'

@Injectable()
export class ApiAdminCommunityService {
  constructor(private readonly core: ApiCoreService) {}

  async createCommunity(userId: string, input: AdminCreateCommunityInput) {
    return this.core.createCommunity({ userId, input })
  }

  async deleteCommunity(communityId: string) {
    const deleted = await this.core.data.community.delete({ where: { id: communityId } })
    return !!deleted
  }

  async findManyCommunity(input: AdminFindManyCommunityInput): Promise<CommunityPaging> {
    return this.core.data.community
      .paginate({
        orderBy: { name: 'asc' },
        where: getAdminCommunityWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCommunity(communityId: string) {
    return this.core.getCommunityById(communityId)
  }

  async updateCommunity(communityId: string, input: AdminUpdateCommunityInput) {
    return this.core.data.community.update({ where: { id: communityId }, data: input })
  }
}
