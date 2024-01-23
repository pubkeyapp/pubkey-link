import { NetworkCluster, NetworkType } from '@prisma/client'

export function getNetworkType(cluster: NetworkCluster): NetworkType {
  switch (cluster) {
    case NetworkCluster.SolanaCustom:
    case NetworkCluster.SolanaDevnet:
    case NetworkCluster.SolanaMainnet:
    case NetworkCluster.SolanaTestnet:
      return NetworkType.Solana
    default:
      throw new Error(`Unknown network type: ${cluster}`)
  }
}
