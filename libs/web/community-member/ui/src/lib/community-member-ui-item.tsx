import { CommunityMember } from '@pubkey-link/sdk'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { UiWarning } from '@pubkey-ui/core'
import { CommunityMemberUiRoleBadge } from './community-member-ui-role-badge'

export function CommunityMemberUiItem({ communityMember }: { communityMember?: CommunityMember }) {
  if (!communityMember) return null

  return communityMember.user ? (
    <UserUiItem user={communityMember.user} to={communityMember.user.profileUrl}>
      <CommunityMemberUiRoleBadge size="xs" variant="dot" role={communityMember.role} />
    </UserUiItem>
  ) : (
    <UiWarning message={`User not found for member ${communityMember.id}`} />
  )
}
