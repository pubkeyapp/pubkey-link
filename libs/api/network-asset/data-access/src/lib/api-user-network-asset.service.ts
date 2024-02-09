import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { NetworkCluster } from '@pubkey-link/api-network-data-access'
import { UserFindManyNetworkAssetInput } from './dto/user-find-many-network-asset.input'
import { NetworkAssetPaging } from './entity/network-asset-paging.entity'
import { getUserNetworkAssetWhereInput } from './helpers/get-user-network-asset-where.input'

@Injectable()
export class ApiUserNetworkAssetService {
  constructor(private readonly core: ApiCoreService) {}

  async findManyNetworkAsset(input: UserFindManyNetworkAssetInput): Promise<NetworkAssetPaging> {
    const identities = await this.core.getSolanaIdentities({ username: input.username })

    return this.core.data.networkAsset
      .paginate({
        orderBy: { group: 'asc' },
        where: getUserNetworkAssetWhereInput(identities, input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneNetworkAsset(cluster: NetworkCluster, account: string) {
    return this.core.data.networkAsset.findUnique({
      where: { account_cluster: { cluster, account } },
    })
  }
}
