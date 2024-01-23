import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOneNetwork } from '@pubkey-link/web-network-data-access'
import { useParams } from 'react-router-dom'
import { AdminNetworkDetailSettingsTab } from './admin-network-detail-settings.tab'
import { NetworkUiItem } from '@pubkey-link/web-network-ui'
import { AdminNetworkTokenFeature } from '@pubkey-link/web-network-token-feature'

export function AdminNetworkDetailFeature() {
  const { networkId } = useParams<{ networkId: string }>() as { networkId: string }
  const { item, query } = useAdminFindOneNetwork({ networkId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Network not found." />
  }

  return (
    <UiPage
      title={<NetworkUiItem network={item} to={`./${item.id}`} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          { path: 'tokens', label: 'Tokens', element: <AdminNetworkTokenFeature cluster={item.cluster} /> },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminNetworkDetailSettingsTab networkId={networkId} />,
          },
        ]}
      />
    </UiPage>
  )
}
