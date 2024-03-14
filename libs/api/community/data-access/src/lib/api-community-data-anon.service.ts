import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'

@Injectable()
export class ApiCommunityDataAnonService {
  constructor(private readonly core: ApiCoreService) {}

  async getCommunities() {
    return this.core.data.community.findMany({
      where: { featured: true, bot: { isNot: null } },
      orderBy: { name: 'asc' },
    })
  }
}
