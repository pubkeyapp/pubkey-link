import { Injectable } from '@nestjs/common'
import { ApiCommunityDataService } from './api-community-data.service'
import { AdminCreateCommunityInput } from './dto/admin-create-community.input'
import { AdminFindManyCommunityInput } from './dto/admin-find-many-community.input'
import { AdminUpdateCommunityInput } from './dto/admin-update-community.input'
import { CommunityPaging } from './entity/community-paging.entity'
import { getCommunityWhereAdminInput } from './helpers/get-community-where-admin.input'

@Injectable()
export class ApiCommunityDataAdminService {
  constructor(private readonly data: ApiCommunityDataService) {}

  async createCommunity(userId: string, input: AdminCreateCommunityInput) {
    return this.data.create(userId, input)
  }

  async deleteCommunity(communityId: string) {
    return this.data.delete(communityId)
  }

  async findManyCommunity(input: AdminFindManyCommunityInput): Promise<CommunityPaging> {
    return this.data.findMany({
      orderBy: { name: 'asc' },
      where: getCommunityWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunity(communityId: string) {
    return this.data.findOne(communityId)
  }

  async updateCommunity(communityId: string, input: AdminUpdateCommunityInput) {
    return this.data.update(communityId, input)
  }
}
