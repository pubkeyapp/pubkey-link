import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { UserFindManyNetworkTokenInput } from './dto/user-find-many-network-token.input'
import { NetworkTokenPaging } from './entity/network-token-paging.entity'
import { getUserNetworkTokenWhereInput } from './helpers/get-user-network-token-where-input'

@Injectable()
export class ApiUserNetworkTokenService {
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async findManyNetworkToken(input: UserFindManyNetworkTokenInput): Promise<NetworkTokenPaging> {
    const filters = await this.getNetworkTokenFilters(input.username)
    return this.core.data.networkToken
      .paginate({
        orderBy: [{ type: 'desc' }, { name: 'asc' }],
        where: getUserNetworkTokenWhereInput(filters, input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  private async getNetworkTokenFilters(username?: string | null): Promise<string[]> {
    if (!username) {
      return []
    }
    return this.core
      .getSolanaIdentities({ username })
      .then((owners) => {
        return this.core.data.networkAsset.findMany({
          where: { owner: { in: owners } },
          select: { group: true },
          distinct: ['group'],
        })
      })
      .then((res) => res.filter((r) => r.group?.length).map((r) => r.group as string))
  }
}
