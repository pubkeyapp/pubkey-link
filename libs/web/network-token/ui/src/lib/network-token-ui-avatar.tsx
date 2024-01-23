import { NetworkToken } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-link/web-ui-core'

export type NetworkTokenUiAvatarProps = UiAvatarProps & {
  networkToken?: NetworkToken
}

export function NetworkTokenUiAvatar({ networkToken, ...props }: NetworkTokenUiAvatarProps) {
  return <UiAvatar avatarUrl={networkToken?.imageUrl} name={networkToken?.name} {...props} />
}
