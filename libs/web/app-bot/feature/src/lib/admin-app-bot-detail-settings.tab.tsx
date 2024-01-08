import { useAdminFindOneAppBot } from '@pubkey-link/web-app-bot-data-access'
import { AdminAppBotUiUpdateForm } from '@pubkey-link/web-app-bot-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminAppBotDetailSettingsTab({ appBotId }: { appBotId: string }) {
  const { item, query, updateAppBot } = useAdminFindOneAppBot({ appBotId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="AppBot not found." />
  }

  return (
    <UiCard>
      <AdminAppBotUiUpdateForm appBot={item} submit={updateAppBot} />
    </UiCard>
  )
}
