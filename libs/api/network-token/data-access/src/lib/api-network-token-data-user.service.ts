import { Injectable } from '@nestjs/common'
import { ApiNetworkTokenDataService } from './api-network-token-data.service'
import { UserFindManyNetworkTokenInput } from './dto/user-find-many-network-token.input'
import { NetworkTokenPaging } from './entity/network-token.entity'
import { getNetworkTokenWhereUserInput } from './helpers/get-network-token-where-user.input'

@Injectable()
export class ApiNetworkTokenDataUserService {
  constructor(private readonly data: ApiNetworkTokenDataService) {}

  async findManyNetworkToken(input: UserFindManyNetworkTokenInput): Promise<NetworkTokenPaging> {
    const filters = await this.data.getNetworkTokenFilters(input.username)

    return this.data.findMany({
      orderBy: [{ type: 'desc' }, { name: 'asc' }],
      where: getNetworkTokenWhereUserInput(filters, input),
      limit: input.limit,
      page: input.page,
    })
  }
}
