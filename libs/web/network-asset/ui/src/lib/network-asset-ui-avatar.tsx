import { NetworkAsset } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type NetworkAssetUiAvatarProps = UiAvatarProps & {
  networkAsset?: NetworkAsset
}

export function NetworkAssetUiAvatar({ networkAsset, ...props }: NetworkAssetUiAvatarProps) {
  return <UiAvatar url={networkAsset?.imageUrl} name={networkAsset?.name} {...props} />
}
