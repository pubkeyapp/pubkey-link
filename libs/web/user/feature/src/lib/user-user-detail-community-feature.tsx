import { useUserGetCommunities } from '@pubkey-link/web-community-data-access'
import { CommunityUiList } from '@pubkey-link/web-community-ui'
import { UiDebugModal, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'

export function UserUserDetailCommunityFeature({ username }: { username: string }) {
  const { items, query } = useUserGetCommunities({ username })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!items?.length) {
    return <UiWarning message={`${username} is not part of any community.`} />
  }

  return (
    <UiStack>
      <CommunityUiList communities={items} />
      <UiDebugModal data={items} />
    </UiStack>
  )
}
