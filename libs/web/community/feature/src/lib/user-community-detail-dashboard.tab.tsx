import { Button, SimpleGrid } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { BotUiItem, UserBotPermissionUiTable } from '@pubkey-link/web-bot-ui'
import { useUserFindManyRule } from '@pubkey-link/web-rule-data-access'
import { RuleUiItem } from '@pubkey-link/web-rule-ui'
import { UiCard, UiCardTitle, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export default function UserCommunityDetailDashboardTab({ community }: { community: Community }) {
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 0, sm: 2 }} spacing={20}>
        <CommunityDashboardCardRules community={community} />
        <CommunityDashboardCardBot community={community} />
      </SimpleGrid>
    </UiStack>
  )
}

export function CommunityDashboardCardRules({ community }: { community: Community }) {
  const { items, query } = useUserFindManyRule({ communityId: community.id })
  return query.isLoading ? (
    <UiLoader />
  ) : items?.length ? (
    <UiCard title={<UiCardTitle>Rules</UiCardTitle>}>
      <UiStack>
        {items.map((item) => (
          <RuleUiItem key={item.id} rule={item} to={item.viewUrl} />
        ))}
      </UiStack>
    </UiCard>
  ) : (
    <UiCard title="No rules found.">
      <UiGroup>
        <div>This community does not have any rules.</div>
        <Button component={Link} to={'../rules'}>
          Add rules
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
        <UserBotPermissionUiTable permissions={item.permissions ?? []} />
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
