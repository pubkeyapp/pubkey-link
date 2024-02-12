import { Button, SimpleGrid, Text } from '@mantine/core'
import { Community, CommunityRole } from '@pubkey-link/sdk'
import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { BotUiItem, UserBotPermissionUiTable } from '@pubkey-link/web-bot-ui'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { useUserFindManyRole } from '@pubkey-link/web-role-data-access'
import { RoleConditionUiItem, RoleUiItem } from '@pubkey-link/web-role-ui'
import { UiCard, UiCardTitle, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export default function UserCommunityDetailDashboardTab({
  community,
  role,
}: {
  community: Community
  role: CommunityRole
}) {
  switch (role) {
    case CommunityRole.Admin:
      return (
        <UiStack>
          <CommunityDashboardAdmin community={community} />
          <CommunityDashboardMember community={community} />
        </UiStack>
      )
    case CommunityRole.Member:
      return <CommunityDashboardMember community={community} />
  }
}

function CommunityDashboardAdmin({ community }: { community: Community }) {
  return (
    <UiStack>
      <UiCard>
        <UiStack>
          <UiCardTitle>Admin Dashboard</UiCardTitle>
        </UiStack>
      </UiCard>
      <SimpleGrid cols={{ base: 0, xl: 2 }} spacing={20}>
        <CommunityDashboardAdminCardRoles community={community} />
        <CommunityDashboardCardBot community={community} />
      </SimpleGrid>
    </UiStack>
  )
}
function CommunityDashboardMember({ community }: { community: Community }) {
  return (
    <UiStack>
      <UiCard>
        <UiStack>
          <UiCardTitle>Community Dashboard</UiCardTitle>
          <UiInfo title="Under Construction" message="We are working on this dashboard to make it better." />
        </UiStack>
      </UiCard>
      <CommunityDashboardMemberCardRoles community={community} />
    </UiStack>
  )
}
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

export function CommunityDashboardMemberCardRoles({ community }: { community: Community }) {
  const { items, query } = useUserFindManyRole({ communityId: community.id })

  const filtered = items?.filter((item) => (item?.conditions ?? [])?.length > 0)

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : filtered?.length ? (
        <SimpleGrid cols={{ base: 0, lg: 2 }} spacing={20}>
          {filtered.map((item) => (
            <UiCard title={<RoleUiItem key={item.id} role={item} />} key={item.id}>
              <UiStack>
                <UiStack gap={0}>
                  <Text size="lg" fw="bold">
                    Conditions
                  </Text>
                  <Text size="sm" c="dimmed">
                    One of the following conditions must be met to join this role.
                  </Text>
                </UiStack>
                {item.conditions?.map((condition) => (
                  <UiStack key={condition.id}>
                    <RoleConditionUiItem type={condition.type}>
                      {condition.token ? (
                        <NetworkTokenUiItem groupProps={{ mt: 'sm' }} networkToken={condition.token} />
                      ) : null}
                    </RoleConditionUiItem>
                  </UiStack>
                ))}
              </UiStack>
            </UiCard>
          ))}
        </SimpleGrid>
      ) : (
        <UiCard title="No roles found.">
          <UiGroup>
            <div>This community does not have any roles.</div>
            <Button component={Link} to={'../roles'}>
              Add roles
            </Button>
          </UiGroup>
        </UiCard>
      )}
    </UiStack>
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
