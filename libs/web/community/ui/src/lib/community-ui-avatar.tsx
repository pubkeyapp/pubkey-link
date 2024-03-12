import { Community } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type CommunityUiAvatarProps = UiAvatarProps & {
  community?: Community
}

export function CommunityUiAvatar({ community, ...props }: CommunityUiAvatarProps) {
  return <UiAvatar url={community?.avatarUrl} name={community?.name} {...props} />
}
