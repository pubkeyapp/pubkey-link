import { Button, Group } from '@mantine/core'
import { UiSearchField } from '@pubkey-link/web-core-ui'
import { useUserFindManyTeam } from '@pubkey-link/web-team-data-access'
import { UserTeamUiTable } from '@pubkey-link/web-team-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function UserTeamListFeature({ communityId }: { communityId: string }) {
  const { deleteTeam, items, pagination, query, setSearch } = useUserFindManyTeam({
    communityId,
    limit: 12,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search team" setSearch={setSearch} />
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserTeamUiTable
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
