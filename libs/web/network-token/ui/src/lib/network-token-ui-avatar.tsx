import { NetworkToken } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type NetworkTokenUiAvatarProps = UiAvatarProps & {
  networkToken?: NetworkToken
}

export function NetworkTokenUiAvatar({ networkToken, ...props }: NetworkTokenUiAvatarProps) {
  return <UiAvatar radius="sm" url={networkToken?.imageUrl} name={networkToken?.name} {...props} />
}
