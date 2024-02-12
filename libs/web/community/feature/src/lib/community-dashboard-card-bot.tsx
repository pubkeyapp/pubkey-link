import { Button } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { BotUiItem, UserBotPermissionUiTable } from '@pubkey-link/web-bot-ui'
import { UiCard, UiCardTitle, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

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
