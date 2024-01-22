import { useUserFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { UiCard, UiDebug, UiError, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export default function UserCommunityDetailDashboardTab({ communityId }: { communityId: string }) {
  const { item, query } = useUserFindOneCommunity({ communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <UiCard>
      <UiStack>
        <UiInfo title="Best I can do for now." message="This is a placeholder for the community dashboard." />
        <UiDebug data={item} />
      </UiStack>
    </UiCard>
  )
}
