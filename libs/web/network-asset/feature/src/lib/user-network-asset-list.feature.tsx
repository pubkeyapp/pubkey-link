import { Group } from '@mantine/core'
import { NetworkCluster, NetworkTokenType } from '@pubkey-link/sdk'
import { useUserFindManyNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { NetworkAssetUiGrid } from '@pubkey-link/web-network-asset-ui'
import { NetworkUiSelectCluster } from '@pubkey-link/web-network-ui'
import { UiSearchField } from '@pubkey-link/web-core-ui'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export default function UserNetworkAssetListFeature({
  group,
  cluster: propsCluster,
  username,
  type,
  hideCluster = false,
}: {
  hideCluster?: boolean
  cluster?: NetworkCluster
  group?: string
  username: string
  type: NetworkTokenType
}) {
  const { items, pagination, query, setSearch, cluster, setCluster } = useUserFindManyNetworkAsset({
    limit: 12,
    cluster: propsCluster,
    group,
    username,
    type,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search assets" setSearch={setSearch} />
        {!hideCluster && <NetworkUiSelectCluster value={cluster} setValue={setCluster} />}
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <NetworkAssetUiGrid
          networkAssets={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message={`No ${type ? type : ''} assets found${cluster ? ` on cluster ${cluster}` : ''}.`} />
      )}
    </UiStack>
  )
}
