import { Group } from '@mantine/core'
import { NetworkTokenType } from '@pubkey-link/sdk'
import { useUserFindManyNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { NetworkAssetUiGrid } from '@pubkey-link/web-network-asset-ui'
import { NetworkUiSelectCluster } from '@pubkey-link/web-network-ui'
import { UiSearchField } from '@pubkey-link/web-ui-core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export default function UserNetworkAssetListFeature({ username, type }: { username: string; type: NetworkTokenType }) {
  const { items, pagination, query, setSearch, cluster, setCluster } = useUserFindManyNetworkAsset({
    limit: 12,
    username,
    type,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search assets" setSearch={setSearch} />
        <NetworkUiSelectCluster value={cluster} setValue={setCluster} />
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
