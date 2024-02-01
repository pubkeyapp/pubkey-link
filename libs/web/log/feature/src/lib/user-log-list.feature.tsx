import { Group } from '@mantine/core'
import { useUserFindManyLog } from '@pubkey-link/web-log-data-access'
import { UserLogUiTable } from '@pubkey-link/web-log-ui'
import { UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserLogListFeature({ communityId }: { communityId: string }) {
  const { deleteLog, items, pagination, query, setSearch } = useUserFindManyLog({
    communityId,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search logs" setSearch={setSearch} />
        <UiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserLogUiTable
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
