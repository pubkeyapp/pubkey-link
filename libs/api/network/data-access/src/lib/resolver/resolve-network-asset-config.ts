import { NetworkCluster, NetworkToken } from '@prisma/client'

export interface ResolveNetworkAssetConfig {
  anybodiesTokens: NetworkToken[]
  cluster: NetworkCluster
  owner: string
  solanaFungibleTokens: NetworkToken[]
  solanaNonFungibleTokens: NetworkToken[]
}
