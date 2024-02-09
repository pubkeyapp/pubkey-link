import type { NetworkAsset } from '@pubkey-link/sdk'
import { NetworkAssetUiItem } from './network-asset-ui-item'

export function NetworkAssetUiGridItem({ networkAsset, to }: { networkAsset: NetworkAsset; to?: string }) {
  return <NetworkAssetUiItem networkAsset={networkAsset} to={to} />
}
