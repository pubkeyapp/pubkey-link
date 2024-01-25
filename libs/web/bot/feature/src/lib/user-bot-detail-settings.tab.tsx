import { Bot } from '@pubkey-link/sdk'
import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { UserBotUiUpdateForm } from '@pubkey-link/web-bot-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserBotDetailSettingsTab({ bot }: { bot: Bot }) {
  const { item, query, updateBot } = useUserFindOneBot({ communityId: bot.communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Bot not found." />
  }

  return (
    <UiCard>
      <UserBotUiUpdateForm bot={item} submit={(input) => updateBot(item.id, input)} />
    </UiCard>
  )
}
