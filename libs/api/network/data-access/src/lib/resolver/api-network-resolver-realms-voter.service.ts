import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { ApiNetworkClusterService } from '../api-network-cluster.service'
import { NetworkCluster, NetworkToken } from '@prisma/client'
import { getRealmsVoters, NetworkAssetInput } from '@pubkey-link/api-network-util'
import { ApiNetworkResolverSolanaNonFungibleService } from './api-network-resolver-solana-non-fungible.service'

@Injectable()
export class ApiNetworkResolverRealmsVoterService {
  private readonly logger = new Logger(ApiNetworkResolverSolanaNonFungibleService.name)

  constructor(readonly core: ApiCoreService, readonly cluster: ApiNetworkClusterService) {}

  async resolve({ owner, tokens }: { owner: string; tokens: NetworkToken[] }): Promise<NetworkAssetInput[]> {
    const cluster = NetworkCluster.SolanaMainnet
    const groups = tokens.map((token) => token.account)

    const tag = `resolveNetworkAssetsSolanaRealmsVoter(${owner}, ${cluster})`
    this.logger.verbose(`${tag}: Start resolving assets for groups: ${groups.join(',')}`)

    const voters = await getRealmsVoters({ realms: groups, owner })
    if (!voters.length) {
      return []
    }

    return [...new Set([...voters])]
  }
}
