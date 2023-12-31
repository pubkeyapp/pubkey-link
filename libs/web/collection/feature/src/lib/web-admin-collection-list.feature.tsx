import { Button, Group, Select } from '@mantine/core'
import { NetworkType } from '@pubkey-link/sdk'
import { useAdminFindManyCollection } from '@pubkey-link/web/collection/data-access'
import { AdminUiCollectionTable } from '@pubkey-link/web/collection/ui'
import { networkTypeOptions } from '@pubkey-link/web/network/ui'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import {
  UiAdminPage,
  UiAlert,
  UiBack,
  UiDebugModal,
  UiLoader,
  UiPagination,
  UiSearchField,
} from '@pubkey-link/web/ui/core'
import { Link } from 'react-router-dom'

export function WebAdminCollectionListFeature() {
  const { deleteCollection, pagination, query, items, network, setNetwork, setSearch } = useAdminFindManyCollection()
  const sdk = useWebSdk()
  return (
    <UiAdminPage
      title="Collections"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items ?? []} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search Collection" setSearch={setSearch} />
        <Select
          value={network?.toString() ?? ''}
          onChange={(network) => {
            pagination.setPage(1)
            setNetwork(network === '' ? undefined : (network as NetworkType))
          }}
          data={[{ value: '', label: 'Filter by network' }, ...networkTypeOptions()]}
        />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminUiCollectionTable
          refresh={() => query.refetch()}
          syncCollection={(collection) => {
            return sdk.adminSyncCollection({ collectionId: collection.id }).then(() => {
              console.log('synced')
            })
          }}
          deleteCollection={(collection) => {
            if (!window.confirm('Are you sure?')) return
            return deleteCollection(collection.id)
          }}
          collections={items}
        />
      ) : (
        <UiAlert message="Collection not found" />
      )}

      <UiPagination pagination={pagination} />
    </UiAdminPage>
  )
}
