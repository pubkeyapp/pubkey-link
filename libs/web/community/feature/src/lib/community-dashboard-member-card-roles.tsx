import { Community } from '@pubkey-link/sdk'
import { useUserFindManyRole } from '@pubkey-link/web-role-data-access'
import { RoleUiList } from '@pubkey-link/web-role-ui'
import { UiCard, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'

export function CommunityDashboardMemberCardRoles({ community }: { community: Community }) {
  const { items, query } = useUserFindManyRole({ communityId: community.id })

  const filtered = items?.filter((item) => (item?.conditions ?? [])?.length > 0)

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : filtered?.length ? (
        <UiCard>
          <RoleUiList mt="xs" roles={filtered ?? []} />
        </UiCard>
      ) : (
        <UiWarning title="No roles found." message="This community does not have any roles." />
      )}
    </UiStack>
  )
}
