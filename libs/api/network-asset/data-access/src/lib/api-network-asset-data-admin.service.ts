import { Injectable } from '@nestjs/common'
import { ApiNetworkAssetDataService } from './api-network-asset-data.service'
import { AdminFindManyNetworkAssetInput } from './dto/admin-find-many-network-asset.input'
import { NetworkAssetPaging } from './entity/network-asset.entity'
import { getNetworkAssetWhereAdminInput } from './helpers/get-network-asset-where-admin.input'

@Injectable()
export class ApiNetworkAssetDataAdminService {
  constructor(private readonly data: ApiNetworkAssetDataService) {}

  async deleteNetworkAsset(networkAssetId: string) {
    return this.data.delete(networkAssetId)
  }

  async findManyNetworkAsset(input: AdminFindManyNetworkAssetInput): Promise<NetworkAssetPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getNetworkAssetWhereAdminInput(input),

      limit: input.limit,
      page: input.page,
    })
  }

  async findOneNetworkAsset(networkAssetId: string) {
    return this.data.findOne(networkAssetId)
  }
}
