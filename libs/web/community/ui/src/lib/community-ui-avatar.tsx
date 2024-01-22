import { Community } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-link/web-ui-core'

export type CommunityUiAvatarProps = UiAvatarProps & {
  community?: Community
}

export function CommunityUiAvatar({ community, ...props }: CommunityUiAvatarProps) {
  return <UiAvatar avatarUrl={undefined} name={community?.name} {...props} />
}
