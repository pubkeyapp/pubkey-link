import { useAdminFindOneBot } from '@pubkey-link/web-bot-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminBotDetailOverviewTab({ botId }: { botId: string }) {
  const { item, query } = useAdminFindOneBot({ botId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Bot not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
