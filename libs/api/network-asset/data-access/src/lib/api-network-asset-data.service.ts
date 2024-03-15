import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-link/api-core-data-access'
import { ApiNetworkService, NetworkCluster } from '@pubkey-link/api-network-data-access'
import { NetworkAssetPaging } from './entity/network-asset.entity'

@Injectable()
export class ApiNetworkAssetDataService {
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async delete(networkAssetId: string) {
    await this.findOne(networkAssetId)
    const deleted = await this.core.data.networkAsset.delete({ where: { id: networkAssetId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.NetworkAssetFindManyArgs & PagingInputFields): Promise<NetworkAssetPaging> {
    return this.core.data.networkAsset
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }
  async findOne(networkAssetId: string) {
    const found = await this.core.data.networkAsset.findUnique({ where: { id: networkAssetId } })
    if (!found) {
      throw new Error(`Network asset ${networkAssetId} not found`)
    }
    return found
  }

  async findOneByAccount(cluster: NetworkCluster, account: string) {
    return this.core.data.networkAsset.findUnique({
      where: { account_cluster: { cluster, account } },
    })
  }
}
