import { useUserFindOneBotServer } from '@pubkey-link/web-bot-data-access'
import { UserBotServerUiUpdateForm } from '@pubkey-link/web-bot-ui'
import { UiAlert, UiCard, UiDebug, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserBotDetailServerSettings({ botId, serverId }: { botId: string; serverId: string }) {
  const { query, updateBotServer } = useUserFindOneBotServer({ botId, serverId })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.item) {
    return <UiAlert message="Server not found." />
  }

  const item = query.data.item

  return (
    <UiStack>
      <UiCard>
        <UiStack>
          <UserBotServerUiUpdateForm botServer={item} submit={updateBotServer} />

          <UiDebug data={item} />
        </UiStack>
      </UiCard>
    </UiStack>
  )
}
