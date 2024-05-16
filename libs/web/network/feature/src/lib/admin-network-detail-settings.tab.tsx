import { useAdminFindOneNetwork } from '@pubkey-link/web-network-data-access'
import { AdminNetworkUiUpdateForm } from '@pubkey-link/web-network-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminNetworkDetailSettingsTab({ networkId }: { networkId: string }) {
  const { item, query, updateNetwork } = useAdminFindOneNetwork({ networkId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Network not found." />
  }

  return (
    <UiCard>
      <AdminNetworkUiUpdateForm network={item} submit={updateNetwork} />
    </UiCard>
  )
}
