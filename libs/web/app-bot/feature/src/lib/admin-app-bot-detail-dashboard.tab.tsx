import { useAdminFindOneAppBot } from '@pubkey-link/web-app-bot-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminAppBotDetailDashboardTab({ appBotId }: { appBotId: string }) {
  const { item, query } = useAdminFindOneAppBot({ appBotId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="AppBot not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} />
    </UiCard>
  )
}
