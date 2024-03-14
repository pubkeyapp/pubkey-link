import { Injectable, Logger } from '@nestjs/common'
import { ApiNetworkTokenDataService } from './api-network-token-data.service'
import { AdminCreateNetworkTokenInput } from './dto/admin-create-network-token.input'
import { AdminFindManyNetworkTokenInput } from './dto/admin-find-many-network-token.input'
import { AdminUpdateNetworkTokenInput } from './dto/admin-update-network-token.input'
import { NetworkTokenPaging } from './entity/network-token.entity'
import { getNetworkTokenWhereAdminInput } from './helpers/get-network-token-where-admin.input'

@Injectable()
export class ApiNetworkTokenDataAdminService {
  private readonly logger = new Logger(ApiNetworkTokenDataAdminService.name)
  constructor(private readonly data: ApiNetworkTokenDataService) {}

  async createNetworkToken(input: AdminCreateNetworkTokenInput) {
    return this.data.create(input)
  }

  async deleteNetworkToken(networkTokenId: string) {
    return this.data.delete(networkTokenId)
  }

  async findManyNetworkToken(input: AdminFindManyNetworkTokenInput): Promise<NetworkTokenPaging> {
    return this.data.findMany({
      orderBy: { name: 'asc' },
      where: getNetworkTokenWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneNetworkToken(networkTokenId: string) {
    return this.data.findOne(networkTokenId)
  }

  async updateNetworkToken(networkTokenId: string, input: AdminUpdateNetworkTokenInput) {
    return this.data.update(networkTokenId, input)
  }

  async updateNetworkTokenMetadata(networkTokenId: string) {
    return this.data.updateNetworkTokenMetadata(networkTokenId)
  }
}
