import { useAdminFindOneNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminNetworkAssetDetailOverviewTab({ networkAssetId }: { networkAssetId: string }) {
  const { item, query } = useAdminFindOneNetworkAsset({ networkAssetId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="NetworkAsset not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
