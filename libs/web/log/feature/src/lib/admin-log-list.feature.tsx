import { Button, Group, Select } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { useAdminFindManyLog } from '@pubkey-link/web-log-data-access'
import { AdminLogUiSelectLevel, AdminLogUiTable } from '@pubkey-link/web-log-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminLogListFeature({ communityId, userId }: { communityId?: string; userId?: string }) {
  const { deleteLog, items, level, setLevel, pagination, query, interval, purgeLogs, setInterval, setSearch } =
    useAdminFindManyLog({
      limit: 50,
      communityId,
      userId,
    })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search log" setSearch={setSearch} />
        <UiDebugModal data={items} />
        <Select
          style={{ width: 90 }}
          value={interval.toString()}
          onChange={(value) => {
            setInterval(parseInt(value ?? '10'))
          }}
          data={[
            { value: '5', label: '5s' },
            { value: '10', label: '10s' },
            { value: '30', label: '30s' },
            { value: '60', label: '1m' },
          ]}
        />
        <AdminLogUiSelectLevel value={level} setValue={setLevel} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <Button
          variant="light"
          onClick={() => {
            if (!window.confirm('Are you sure?')) return
            return purgeLogs()
          }}
        >
          Purge Logs
        </Button>
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
