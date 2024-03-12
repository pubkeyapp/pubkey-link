import { CommunityMember } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type CommunityMemberUiAvatarProps = UiAvatarProps & {
  communityMember?: CommunityMember
}

export function CommunityMemberUiAvatar({ communityMember, ...props }: CommunityMemberUiAvatarProps) {
  return <UiAvatar url={undefined} name={communityMember?.role} {...props} />
}
