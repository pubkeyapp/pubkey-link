import { Injectable } from '@nestjs/common'
import { NetworkCluster, NetworkTokenType } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiAdminNetworkAssetService } from './api-admin-network-asset.service'
import { ApiNetworkAssetSyncService } from './api-network-asset-sync.service'
import { ApiUserNetworkAssetService } from './api-user-network-asset.service'

@Injectable()
export class ApiNetworkAssetService {
  constructor(
    readonly admin: ApiAdminNetworkAssetService,
    readonly core: ApiCoreService,
    readonly user: ApiUserNetworkAssetService,
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
    owners,
    cluster,
    groups,
  }: {
    groups: string[]
    cluster: NetworkCluster
    owners: string[]
  }) {
    return this.core.data.networkAsset.findMany({
      where: { owner: { in: owners }, group: { in: groups }, cluster, type: NetworkTokenType.NonFungible },
    })
  }
}
