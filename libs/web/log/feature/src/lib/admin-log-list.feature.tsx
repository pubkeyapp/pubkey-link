import { Button, Group } from '@mantine/core'
import { useAdminFindManyLog } from '@pubkey-link/web-log-data-access'
import { AdminLogUiTable } from '@pubkey-link/web-log-ui'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminLogListFeature({ communityId }: { communityId: string }) {
  const { deleteLog, items, pagination, query, setSearch } = useAdminFindManyLog({
    limit: 10,
    communityId,
  })

  return (
    <UiPage
      title="Logs"
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
        <UiSearchField placeholder="Search log" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminLogUiTable
          deleteLog={(log) => {
            if (!window.confirm('Are you sure?')) return
            return deleteLog(log.id)
          }}
          logs={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No logs found" />
      )}
    </UiPage>
  )
}
