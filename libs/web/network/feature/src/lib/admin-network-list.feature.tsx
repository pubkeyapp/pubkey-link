import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { useAdminFindManyNetwork } from '@pubkey-link/web-network-data-access'
import { AdminNetworkUiTable } from '@pubkey-link/web-network-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminNetworkListFeature() {
  const { deleteNetwork, items, pagination, query, setSearch } = useAdminFindManyNetwork({
    limit: 10,
  })

  return (
    <UiPage
      title="Networks"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search network" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminNetworkUiTable
          deleteNetwork={(network) => {
            if (!window.confirm('Are you sure?')) return
            return deleteNetwork(network.id)
          }}
          networks={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No networks found." />
      )}
    </UiPage>
  )
}
