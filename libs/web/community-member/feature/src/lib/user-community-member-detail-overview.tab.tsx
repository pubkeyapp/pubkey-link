import { useUserFindOneCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function UserCommunityMemberDetailOverviewTab({ communityMemberId }: { communityMemberId: string }) {
  const { item, query } = useUserFindOneCommunityMember({ communityMemberId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="CommunityMember not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
