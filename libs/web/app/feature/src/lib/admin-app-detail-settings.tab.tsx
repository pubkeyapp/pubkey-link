import { useAdminFindOneApp } from '@pubkey-link/web-app-data-access'
import { AdminAppUiUpdateForm } from '@pubkey-link/web-app-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminAppDetailSettingsTab({ appId }: { appId: string }) {
  const { item, query, updateApp } = useAdminFindOneApp({ appId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="App not found." />
  }

  return (
    <UiCard>
      <AdminAppUiUpdateForm app={item} submit={updateApp} />
    </UiCard>
  )
}
