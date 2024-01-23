import { CommunityMember } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-link/web-ui-core'

export type CommunityMemberUiAvatarProps = UiAvatarProps & {
  communityMember?: CommunityMember
}

export function CommunityMemberUiAvatar({ communityMember, ...props }: CommunityMemberUiAvatarProps) {
  return <UiAvatar avatarUrl={undefined} name={communityMember?.role} {...props} />
}
