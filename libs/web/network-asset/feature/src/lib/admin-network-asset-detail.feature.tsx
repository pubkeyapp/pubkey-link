import { Group } from '@mantine/core'
import { useAdminFindOneNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminNetworkAssetDetailOverviewTab } from './admin-network-asset-detail-overview.tab'

export function AdminNetworkAssetDetailFeature() {
  const { networkAssetId } = useParams<{ networkAssetId: string }>() as { networkAssetId: string }
  const { item, query } = useAdminFindOneNetworkAsset({ networkAssetId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="NetworkAsset not found." />
  }

  return (
    <UiPage
      title={<Group>{item.name}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <AdminNetworkAssetDetailOverviewTab networkAssetId={networkAssetId} />
    </UiPage>
  )
}
