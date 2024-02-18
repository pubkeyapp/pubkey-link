import { Injectable } from '@nestjs/common'
import { CommunityRole } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiAdminCommunityService } from './api-admin-community.service'
import { ApiAnonCommunityService } from './api-anon-community.service'
import { ApiUserCommunityService } from './api-user-community.service'

@Injectable()
export class ApiCommunityService {
  constructor(
    readonly anon: ApiAnonCommunityService,
    readonly core: ApiCoreService,
    readonly admin: ApiAdminCommunityService,
    readonly user: ApiUserCommunityService,
  ) {}

  async ensureCommunityAdmin(userId: string, communityId: string) {
    const found = await this.core.data.community.findUnique({
      where: { id: communityId },
      include: { members: { where: { userId, role: CommunityRole.Admin } } },
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
