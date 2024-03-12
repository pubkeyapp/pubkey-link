import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { useAdminFindManySnapshot } from '@pubkey-link/web-snapshot-data-access'
import { AdminSnapshotUiTable } from '@pubkey-link/web-snapshot-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminSnapshotListFeature() {
  const { deleteSnapshot, items, pagination, query, setSearch } = useAdminFindManySnapshot({
    limit: 10,
  })

  return (
    <UiPage
      title="Snapshots"
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
        <UiSearchField placeholder="Search snapshot" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminSnapshotUiTable
          deleteSnapshot={(snapshot) => {
            if (!window.confirm('Are you sure?')) return
            return deleteSnapshot(snapshot.id)
          }}
          snapshots={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No snapshots found" />
      )}
    </UiPage>
  )
}
