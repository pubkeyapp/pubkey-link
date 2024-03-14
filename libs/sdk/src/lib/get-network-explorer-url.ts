import { NetworkAsset, NetworkCluster, NetworkToken } from '../generated/graphql-sdk'

export function getNetworkExplorerUrl(cluster: NetworkCluster, endpoint = 'http://localost:8899') {
  const base = 'https://solana.fm/{path}'
  switch (cluster) {
    case NetworkCluster.SolanaDevnet:
      return base + '?cluster=devnet-solana'
    case NetworkCluster.SolanaMainnet:
      return base
    case NetworkCluster.SolanaTestnet:
      return base + '?cluster=testnet-solana'
    case NetworkCluster.SolanaCustom:
      return base + `?cluster=custom&customUrl=${encodeURIComponent(endpoint)}`
    default:
      throw new Error(`Unknown network cluster: ${cluster}`)
  }
}

export function getNetworkAssetUrl(token: Pick<NetworkAsset, 'account' | 'cluster'>): string {
  return getNetworkExplorerUrl(token.cluster).replace('{path}', `account/${token.account}`)
}
export function getNetworkTokenUrl(token: Pick<NetworkToken, 'account' | 'cluster'>): string {
  return getNetworkExplorerUrl(token.cluster).replace('{path}', `account/${token.account}`)
}
