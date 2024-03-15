import { Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { useAdminFindManyTeam } from '@pubkey-link/web-team-data-access'
import { AdminTeamUiTable } from '@pubkey-link/web-team-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminTeamListFeature({ communityId }: { communityId: string }) {
  const { deleteTeam, items, pagination, query, setSearch } = useAdminFindManyTeam({
    communityId,
    limit: 10,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search team" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminTeamUiTable
          deleteTeam={(team) => {
            if (!window.confirm('Are you sure?')) return
            return deleteTeam(team.id)
          }}
          teams={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No teams found" />
      )}
    </UiStack>
  )
}
