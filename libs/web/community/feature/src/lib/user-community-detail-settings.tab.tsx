import { Community } from '@pubkey-link/sdk'
import { useUserFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { UserCommunityUiUpdateForm } from '@pubkey-link/web-community-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export default function UserCommunityDetailSettingsTab({ community }: { community: Community }) {
  const { item, query, updateCommunity } = useUserFindOneCommunity({ communityId: community.id })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <UiCard>
      <UserCommunityUiUpdateForm community={item} submit={updateCommunity} />
    </UiCard>
  )
}
