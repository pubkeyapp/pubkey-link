import { Group } from '@mantine/core'
import { useAdminFindManyLog } from '@pubkey-link/web-log-data-access'
import { AdminLogUiTable } from '@pubkey-link/web-log-ui'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminLogListFeature({ communityId, userId }: { communityId?: string; userId?: string }) {
  const { deleteLog, items, pagination, query, setSearch } = useAdminFindManyLog({
    limit: 50,
    communityId,
    userId,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search log" setSearch={setSearch} />
        <UiDebugModal data={items} />
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
    </UiStack>
  )
}
