import { Injectable } from '@nestjs/common'
import { NetworkAssetInput } from '@pubkey-link/api-network-util'
import { ApiNetworkResolverSolanaFungibleService } from './api-network-resolver-solana-fungible.service'
import { ApiNetworkResolverSolanaNonFungibleService } from './api-network-resolver-solana-non-fungible.service'
import { ResolveNetworkAssetConfig } from './resolve-network-asset-config'
import { ApiNetworkResolverRealmsVoterService } from './api-network-resolver-realms-voter.service'

@Injectable()
export class ApiNetworkResolverService {
  constructor(
    readonly solanaFungible: ApiNetworkResolverSolanaFungibleService,
    readonly solanaNonFungible: ApiNetworkResolverSolanaNonFungibleService,
    readonly solanaRealmsVoter: ApiNetworkResolverRealmsVoterService,
  ) {}

  async resolveNetworkAssets({
    cluster,
    owner,
    solanaFungibleTokens,
    solanaNonFungibleTokens,
    solanaRealmsVoterTokens,
  }: ResolveNetworkAssetConfig): Promise<NetworkAssetInput[]> {
    const assets: NetworkAssetInput[] = []

    if (solanaFungibleTokens.length > 0) {
      const resolved = await this.solanaFungible.resolve({
        cluster,
        owner,
        tokens: solanaFungibleTokens,
      })
      assets.push(...resolved)
    }

    if (solanaNonFungibleTokens.length > 0) {
      const resolved = await this.solanaNonFungible.resolve({
        cluster,
        owner,
        tokens: solanaNonFungibleTokens,
      })
      assets.push(...resolved)
    }

    if (solanaRealmsVoterTokens.length > 0) {
      const resolved = await this.solanaRealmsVoter.resolve({
        owner,
        tokens: solanaRealmsVoterTokens,
      })
      assets.push(...resolved)
    }

    return assets
  }
}
