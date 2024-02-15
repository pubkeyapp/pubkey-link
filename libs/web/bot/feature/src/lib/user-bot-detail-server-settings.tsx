import { Button } from '@mantine/core'
import { useUserFindOneBotServer, useUserGetBotChannels, useUserGetBotRoles } from '@pubkey-link/web-bot-data-access'
import { UserBotServerUiUpdateForm } from '@pubkey-link/web-bot-ui'
import { UiAlert, UiCard, UiDebug, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserBotDetailServerSettings({ botId, serverId }: { botId: string; serverId: string }) {
  const { query, updateBotServer, testBotServerConfig } = useUserFindOneBotServer({ botId, serverId })

  const { query: channelsQuery, channelOptions } = useUserGetBotChannels({ botId, serverId })
  const { query: rolesQuery, roleOptions } = useUserGetBotRoles({ botId, serverId })

  const item = query.data?.item

  if (query.isLoading || channelsQuery.isLoading || rolesQuery.isLoading) {
    return <UiLoader />
  }

  if (!item) {
    return <UiAlert message="Server not found." />
  }

  if (!channelOptions.length) {
    return <UiAlert message="No roles found." />
  }

  if (!roleOptions.length) {
    return <UiAlert message="No roles found." />
  }

  return (
    <UiStack>
      <UiCard>
        <UiStack>
          <UserBotServerUiUpdateForm
            botServer={item}
            channels={channelOptions}
            roles={roleOptions}
            submit={updateBotServer}
          >
            <Button variant={'light'} onClick={testBotServerConfig}>
              Test Bot Server Config
            </Button>
          </UserBotServerUiUpdateForm>

          <UiDebug data={{ item, channelOptions, roleOptions }} />
        </UiStack>
      </UiCard>
    </UiStack>
  )
}
