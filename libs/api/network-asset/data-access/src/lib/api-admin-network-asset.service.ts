import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { AdminFindManyNetworkAssetInput } from './dto/admin-find-many-network-asset.input'
import { NetworkAssetPaging } from './entity/network-asset-paging.entity'
import { getAdminNetworkAssetWhereInput } from './helpers/get-admin-network-asset-where.input'

@Injectable()
export class ApiAdminNetworkAssetService {
  constructor(private readonly core: ApiCoreService) {}

  async deleteNetworkAsset(networkAssetId: string) {
    const deleted = await this.core.data.networkAsset.delete({ where: { id: networkAssetId } })
    return !!deleted
  }

  async findManyNetworkAsset(input: AdminFindManyNetworkAssetInput): Promise<NetworkAssetPaging> {
    return this.core.data.networkAsset
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminNetworkAssetWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneNetworkAsset(networkAssetId: string) {
    return this.core.data.networkAsset.findUnique({ where: { id: networkAssetId } })
  }
}
