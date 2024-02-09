import { NetworkAsset } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-link/web-ui-core'

export type NetworkAssetUiAvatarProps = UiAvatarProps & {
  networkAsset?: NetworkAsset
}

export function NetworkAssetUiAvatar({ networkAsset, ...props }: NetworkAssetUiAvatarProps) {
  return <UiAvatar avatarUrl={networkAsset?.imageUrl} name={networkAsset?.name} {...props} />
}
