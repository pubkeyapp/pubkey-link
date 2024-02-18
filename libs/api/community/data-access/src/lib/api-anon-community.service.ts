import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'

@Injectable()
export class ApiAnonCommunityService {
  constructor(private readonly core: ApiCoreService) {}

  async getCommunities() {
    return this.core.data.community.findMany({
      where: {
        featured: true,
      },
      include: {
        roles: {
          orderBy: { name: 'asc' },
        },
      },
    })
  }
}
