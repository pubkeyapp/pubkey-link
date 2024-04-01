import { Injectable } from '@nestjs/common'
import { NetworkCluster, NetworkTokenType } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkAssetDataAdminService } from './api-network-asset-data-admin.service'
import { ApiNetworkAssetDataUserService } from './api-network-asset-data-user.service'
import { ApiNetworkAssetSyncService } from './api-network-asset-sync.service'

@Injectable()
export class ApiNetworkAssetService {
  constructor(
    readonly admin: ApiNetworkAssetDataAdminService,
    readonly core: ApiCoreService,
    readonly user: ApiNetworkAssetDataUserService,
    readonly sync: ApiNetworkAssetSyncService,
  ) {}

  async getFungibleAssetsForOwners({
    owners,
    cluster,
    mint,
    program,
  }: {
    mint: string
    cluster: NetworkCluster
    owners: string[]
    program: string
  }) {
    return this.core.data.networkAsset.findMany({
      where: { owner: { in: owners }, mint, cluster, program, type: NetworkTokenType.Fungible },
    })
  }

  async getNonFungibleAssetsForOwners({
    cluster,
    groups,
    mints = [],
    owners,
  }: {
    mints: string[]
    groups: string[]
    cluster: NetworkCluster
    owners: string[]
  }) {
    return this.core.data.networkAsset.findMany({
      where: {
        owner: { in: owners },
        cluster,
        type: NetworkTokenType.NonFungible,
        OR: [
          { account: mints.length ? { in: mints } : undefined },
          { group: groups.length ? { in: groups } : undefined },
        ],
      },
    })
  }
}
