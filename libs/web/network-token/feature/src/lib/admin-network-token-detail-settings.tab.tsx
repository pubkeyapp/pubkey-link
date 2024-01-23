import { useAdminFindOneNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { AdminNetworkTokenUiUpdateForm } from '@pubkey-link/web-network-token-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminNetworkTokenDetailSettingsTab({ networkTokenId }: { networkTokenId: string }) {
  const { item, query, updateNetworkToken } = useAdminFindOneNetworkToken({ networkTokenId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="NetworkToken not found." />
  }

  return (
    <UiCard>
      <AdminNetworkTokenUiUpdateForm networkToken={item} submit={updateNetworkToken} />
    </UiCard>
  )
}
