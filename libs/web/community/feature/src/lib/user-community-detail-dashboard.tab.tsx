import { Button, SimpleGrid } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { BotUiItem, UserBotPermissionUiTable } from '@pubkey-link/web-bot-ui'
import { useUserFindManyRole } from '@pubkey-link/web-role-data-access'
import { RoleUiItem } from '@pubkey-link/web-role-ui'
import { UiCard, UiCardTitle, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export default function UserCommunityDetailDashboardTab({ community }: { community: Community }) {
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 0, xl: 2 }} spacing={20}>
        <CommunityDashboardCardRoles community={community} />
        <CommunityDashboardCardBot community={community} />
      </SimpleGrid>
    </UiStack>
  )
}

export function CommunityDashboardCardRoles({ community }: { community: Community }) {
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

export function CommunityDashboardCardBot({ community }: { community: Community }) {
  const { item, query } = useUserFindOneBot({ communityId: community.id })
  return query.isLoading ? (
    <UiLoader />
  ) : item ? (
    <UiCard title={<UiCardTitle>Discord Bot</UiCardTitle>}>
      <UiStack>
        <UiCard>
          <BotUiItem bot={item} to="../discord" />
        </UiCard>
        {item.permissions?.length ? (
          <UserBotPermissionUiTable permissions={item.permissions ?? []} />
        ) : (
          <UiInfo message="No permissions" />
        )}
      </UiStack>
    </UiCard>
  ) : (
    <UiCard title="No bot found.">
      <UiGroup>
        <div>This community does not have a bot.</div>
        <Button component={Link} to={'../discord'}>
          Add bot
        </Button>
      </UiGroup>
    </UiCard>
  )
}
