import { useAdminFindOneCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { AdminCommunityMemberUiUpdateForm } from '@pubkey-link/web-community-member-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminCommunityMemberDetailSettingsTab({ communityMemberId }: { communityMemberId: string }) {
  const { item, query, updateCommunityMember } = useAdminFindOneCommunityMember({ communityMemberId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="CommunityMember not found." />
  }

  return (
    <UiCard>
      <AdminCommunityMemberUiUpdateForm communityMember={item} submit={updateCommunityMember} />
    </UiCard>
  )
}
