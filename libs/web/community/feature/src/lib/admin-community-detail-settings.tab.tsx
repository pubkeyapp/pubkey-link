import { useAdminFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { AdminCommunityUiUpdateForm } from '@pubkey-link/web-community-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminCommunityDetailSettingsTab({ communityId }: { communityId: string }) {
  const { item, query, updateCommunity } = useAdminFindOneCommunity({ communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <UiCard>
      <AdminCommunityUiUpdateForm community={item} submit={updateCommunity} />
    </UiCard>
  )
}
