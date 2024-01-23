import { useAdminFindOneBot } from '@pubkey-link/web-bot-data-access'
import { AdminBotUiUpdateForm } from '@pubkey-link/web-bot-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminBotDetailSettingsTab({ botId }: { botId: string }) {
  const { item, query, updateBot } = useAdminFindOneBot({ botId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Bot not found." />
  }

  return (
    <UiCard>
      <AdminBotUiUpdateForm bot={item} submit={updateBot} />
    </UiCard>
  )
}
