import { useAdminFindOneNetwork } from '@pubkey-link/web-network-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminNetworkDetailOverviewTab({ networkId }: { networkId: string }) {
  const { item, query } = useAdminFindOneNetwork({ networkId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Network not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
