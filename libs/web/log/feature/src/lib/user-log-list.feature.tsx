import { Group } from '@mantine/core'
import { useUserFindManyLog } from '@pubkey-link/web-log-data-access'
import { UserLogUiTable } from '@pubkey-link/web-log-ui'
import { UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserLogListFeature({ communityId, networkAssetId }: { communityId?: string; networkAssetId?: string }) {
  const { items, pagination, query, setSearch } = useUserFindManyLog({
    communityId,
    networkAssetId,
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
