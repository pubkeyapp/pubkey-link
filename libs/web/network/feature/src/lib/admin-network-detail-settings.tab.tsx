import { Button } from '@mantine/core'
import { useAdminFindOneNetwork } from '@pubkey-link/web-network-data-access'
import { AdminNetworkUiUpdateForm } from '@pubkey-link/web-network-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminNetworkDetailSettingsTab({ networkId }: { networkId: string }) {
  const { item, query, syncNetworkAssets, verifyNetworkAssets, updateNetwork } = useAdminFindOneNetwork({ networkId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Network not found." />
  }

  return (
    <UiCard>
      <AdminNetworkUiUpdateForm network={item} submit={updateNetwork}>
        <Button onClick={() => syncNetworkAssets()} variant="light">
          Sync assets
        </Button>
        <Button onClick={() => verifyNetworkAssets()} variant="light">
          Verify assets
        </Button>
      </AdminNetworkUiUpdateForm>
    </UiCard>
  )
}
