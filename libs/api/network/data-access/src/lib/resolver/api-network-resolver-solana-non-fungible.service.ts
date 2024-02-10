import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { publicKey } from '@metaplex-foundation/umi'
import { Injectable, Logger } from '@nestjs/common'
import { NetworkCluster, NetworkToken } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { convertDasApiAsset, findNetworkAssetsByGroup, NetworkAssetInput } from '@pubkey-link/api-network-util'

import { ApiNetworkClusterService } from '../api-network-cluster.service'

@Injectable()
export class ApiNetworkResolverSolanaNonFungibleService {
  private readonly logger = new Logger(ApiNetworkResolverSolanaNonFungibleService.name)

  constructor(readonly core: ApiCoreService, readonly cluster: ApiNetworkClusterService) {}

  async resolve({
    cluster,
    owner,
    tokens,
  }: {
    cluster: NetworkCluster
    owner: string
    tokens: NetworkToken[]
  }): Promise<NetworkAssetInput[]> {
    const tag = `resolveNetworkAssetsSolanaNonFungible(${owner}, ${cluster}, ${tokens.map((t) => t.account).join(',')})`
    this.logger.verbose(`${tag}: Start resolving assets`)

    const groups = tokens.map((token) => token.account)
    const items: DasApiAsset[] = []
    const umi = await this.cluster.getUmi(cluster)
    const limit = 1000
    let page = 1
    let total = 0

    while (total < page * limit) {
      const assets = await umi.rpc.getAssetsByOwner({
        owner: publicKey(owner),
        limit: limit,
        page,
        sortBy: { sortBy: 'updated', sortDirection: 'desc' },
      })
      this.logger.verbose(`${tag} - page ${page} - ${assets.items.length} assets`)
      items.push(...assets.items)
      total += assets.total
      page++
      if (assets.items.length === 0 || assets.items.length < limit) {
        break
      }
    }

    const converted = items?.map((asset) => convertDasApiAsset({ asset, cluster }))

    return converted ? findNetworkAssetsByGroup(converted, groups) : []
  }
}
