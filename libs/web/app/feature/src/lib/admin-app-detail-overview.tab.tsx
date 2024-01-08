import { useAdminFindOneApp } from '@pubkey-link/web-app-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminAppDetailOverviewTab({ appId }: { appId: string }) {
  const { item, query } = useAdminFindOneApp({ appId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="App not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
