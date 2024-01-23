import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminCreateNetworkInput } from './dto/admin-create-network.input'
import { AdminFindManyNetworkInput } from './dto/admin-find-many-network.input'
import { AdminUpdateNetworkInput } from './dto/admin-update-network.input'
import { NetworkPaging } from './entity/network-paging.entity'
import { getAdminNetworkWhereInput } from './helpers/get-admin-network-where.input'

@Injectable()
export class ApiAdminNetworkService {
  constructor(private readonly core: ApiCoreService) {}

  async createNetwork(input: AdminCreateNetworkInput) {
    return this.core.data.network.create({ data: input })
  }

  async deleteNetwork(networkId: string) {
    const deleted = await this.core.data.network.delete({ where: { id: networkId } })
    return !!deleted
  }

  async findManyNetwork(input: AdminFindManyNetworkInput): Promise<NetworkPaging> {
    return this.core.data.network
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminNetworkWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneNetwork(networkId: string) {
    return this.core.data.network.findUnique({ where: { id: networkId } })
  }

  async updateNetwork(networkId: string, input: AdminUpdateNetworkInput) {
    return this.core.data.network.update({ where: { id: networkId }, data: input })
  }
}
