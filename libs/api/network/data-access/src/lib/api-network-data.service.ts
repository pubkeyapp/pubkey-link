import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { getNetworkType } from '@pubkey-link/api-network-util'
import { EVENT_NETWORK_CREATED, EVENT_NETWORK_DELETED, EVENT_NETWORK_UPDATED } from './api-network.events'
import { NetworkPaging } from './entity/network.entity'

@Injectable()
export class ApiNetworkDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Omit<Prisma.NetworkCreateInput, 'type'>) {
    const type = getNetworkType(input.cluster)

    const created = await this.core.data.network.create({ data: { ...input, type, id: input.cluster } })
    this.core.eventEmitter.emit(EVENT_NETWORK_CREATED, { network: created })
    return created
  }

  async delete(networkId: string) {
    const deleted = await this.core.data.network.delete({ where: { id: networkId } })
    this.core.eventEmitter.emit(EVENT_NETWORK_DELETED, { network: deleted })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.NetworkFindManyArgs & PagingInputFields): Promise<NetworkPaging> {
    return this.core.data.network
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }
  async findOne(networkId: string) {
    return this.core.data.network.findUnique({ where: { id: networkId } })
  }

  async update(networkId: string, input: Prisma.NetworkUpdateInput) {
    const updated = await this.core.data.network.update({ where: { id: networkId }, data: input })
    this.core.eventEmitter.emit(EVENT_NETWORK_UPDATED, { network: updated })
    return updated
  }
}
