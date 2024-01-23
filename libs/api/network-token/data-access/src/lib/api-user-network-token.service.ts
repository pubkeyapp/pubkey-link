import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService } from '@pubkey-link/api-network-data-access'
import { getAdminNetworkTokenWhereInput } from './helpers/get-admin-network-token-where.input'
import { NetworkTokenPaging } from './entity/network-token-paging.entity'

import { UserFindManyNetworkTokenInput } from './dto/user-find-many-network-token.input'

@Injectable()
export class ApiUserNetworkTokenService {
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async findManyNetworkToken(input: UserFindManyNetworkTokenInput): Promise<NetworkTokenPaging> {
    return this.core.data.networkToken
      .paginate({
        orderBy: { name: 'asc' },
        where: getAdminNetworkTokenWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }
}
