import { Button, Group } from '@mantine/core'
import { useAdminFindOneNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminNetworkTokenDetailOverviewTab } from './admin-network-token-detail-overview.tab'
import { AdminNetworkTokenDetailSettingsTab } from './admin-network-token-detail-settings.tab'

export function AdminNetworkTokenDetailFeature() {
  const { networkTokenId } = useParams<{ networkTokenId: string }>() as { networkTokenId: string }
  const { item, query, updateNetworkTokenMetadata } = useAdminFindOneNetworkToken({ networkTokenId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="NetworkToken not found." />
  }

  return (
    <UiPage
      title={<NetworkTokenUiItem networkToken={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
          <Button variant="light" onClick={updateNetworkTokenMetadata}>
            Update
          </Button>
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'overview',
            label: 'Overview',
            element: <AdminNetworkTokenDetailOverviewTab networkTokenId={networkTokenId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminNetworkTokenDetailSettingsTab networkTokenId={networkTokenId} />,
          },
        ]}
      />
    </UiPage>
  )
}
