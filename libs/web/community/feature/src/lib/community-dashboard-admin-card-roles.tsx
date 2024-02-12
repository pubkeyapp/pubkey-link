import { Button } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindManyRole } from '@pubkey-link/web-role-data-access'
import { RoleUiItem } from '@pubkey-link/web-role-ui'
import { UiCard, UiCardTitle, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function CommunityDashboardAdminCardRoles({ community }: { community: Community }) {
  const { items, query } = useUserFindManyRole({ communityId: community.id })
  return query.isLoading ? (
    <UiLoader />
  ) : items?.length ? (
    <UiCard title={<UiCardTitle>Roles</UiCardTitle>}>
      <UiStack>
        {items.map((item) => (
          <RoleUiItem key={item.id} role={item} to={item.viewUrl} />
        ))}
      </UiStack>
    </UiCard>
  ) : (
    <UiCard title="No roles found.">
      <UiGroup>
        <div>This community does not have any roles.</div>
        <Button component={Link} to={'../roles'}>
          Add roles
        </Button>
      </UiGroup>
    </UiCard>
  )
}
