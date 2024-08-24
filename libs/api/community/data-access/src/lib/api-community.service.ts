import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiCommunityDataAdminService } from './api-community-data-admin.service'
import { ApiCommunityDataAnonService } from './api-community-data-anon.service'
import { ApiCommunityDataUserService } from './api-community-data-user.service'

@Injectable()
export class ApiCommunityService {
  constructor(
    readonly anon: ApiCommunityDataAnonService,
    readonly core: ApiCoreService,
    readonly admin: ApiCommunityDataAdminService,
    readonly user: ApiCommunityDataUserService,
  ) {}

  async ensureCommunityAdmin(userId: string, communityId: string) {
    const found = await this.core.data.community.findUnique({
      where: { id: communityId },
      include: { members: { where: { userId, admin: true } } },
    })
    if (!found) {
      throw new Error(`Community ${communityId} not found`)
    }
    if (!found.members.length) {
      throw new Error(`User ${userId} is not an admin of community ${communityId}`)
    }
    return found
  }
}
