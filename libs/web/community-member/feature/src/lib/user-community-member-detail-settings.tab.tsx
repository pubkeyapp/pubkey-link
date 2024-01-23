import { useUserFindOneCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { UserCommunityMemberUiUpdateForm } from '@pubkey-link/web-community-member-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserCommunityMemberDetailSettingsTab({ communityMemberId }: { communityMemberId: string }) {
  const { item, query, updateCommunityMember } = useUserFindOneCommunityMember({ communityMemberId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="CommunityMember not found." />
  }

  return (
    <UiCard>
      <UserCommunityMemberUiUpdateForm communityMember={item} submit={updateCommunityMember} />
    </UiCard>
  )
}
