import { Button } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindOneBot, useUserGetBotServers } from '@pubkey-link/web-bot-data-access'
import { BotUiItem, UserBotPermissionUiTable } from '@pubkey-link/web-bot-ui'
import { UiDiscordServerItem } from '@pubkey-link/web-ui-core'
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
        <BotServers botId={item.id} />
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

export function BotServers({ botId }: { botId: string }) {
  const query = useUserGetBotServers({ botId })

  return query.isLoading ? (
    <UiLoader />
  ) : query.data?.items?.length ? (
    <UiStack>
      <UiCardTitle>Bot Servers</UiCardTitle>
      {query.data?.items?.map((item) => (
        <UiCard key={item.id}>
          <UiDiscordServerItem server={item} to={`../discord/servers/${item.id}`} />
        </UiCard>
      ))}
    </UiStack>
  ) : (
    <UiInfo message="No bot servers found." />
  )
}
