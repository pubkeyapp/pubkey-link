import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { UserBotUiUpdateForm } from '@pubkey-link/web-bot-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserBotDetailSettingsTab() {
  const { item, query, updateBot } = useUserFindOneBot()

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
