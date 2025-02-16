import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { useAdminFindManyAllocation } from '@pubkey-link/web-allocation-data-access'
import { AdminAllocationUiTable } from '@pubkey-link/web-allocation-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminAllocationListFeature() {
  const { deleteAllocation, items, pagination, query, setSearch } = useAdminFindManyAllocation({
    limit: 10,
  })

  return (
    <UiPage
      title="Allocations"
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
        <UiSearchField placeholder="Search allocation" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminAllocationUiTable
          deleteAllocation={(allocation) => {
            if (!window.confirm('Are you sure?')) return
            return deleteAllocation(allocation.id)
          }}
          allocations={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No allocations found" />
      )}
    </UiPage>
  )
}
