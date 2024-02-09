import { Group } from '@mantine/core'
import { NetworkCluster } from '@pubkey-link/sdk'
import { useAdminFindManyNetworkAsset } from '@pubkey-link/web-network-asset-data-access'
import { AdminNetworkAssetUiTable } from '@pubkey-link/web-network-asset-ui'
import { NetworkTokenUiSelectType } from '@pubkey-link/web-network-token-ui'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminNetworkAssetListFeature({ cluster }: { cluster: NetworkCluster }) {
  const { deleteNetworkAsset, items, pagination, type, setType, query, setSearch } = useAdminFindManyNetworkAsset({
    limit: 10,
    cluster,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search asset" setSearch={setSearch} />
        <NetworkTokenUiSelectType value={type} setValue={setType} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminNetworkAssetUiTable
          deleteNetworkAsset={(networkAsset) => {
            if (!window.confirm('Are you sure?')) return
            return deleteNetworkAsset(networkAsset.id)
          }}
          networkAssets={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No assets found" />
      )}
    </UiStack>
  )
}
