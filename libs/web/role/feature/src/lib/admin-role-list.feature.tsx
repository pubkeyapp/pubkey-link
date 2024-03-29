import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { useAdminFindManyRole } from '@pubkey-link/web-role-data-access'
import { AdminRoleUiTable } from '@pubkey-link/web-role-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminRoleListFeature({ communityId }: { communityId: string }) {
  const { deleteRole, items, pagination, query, setSearch } = useAdminFindManyRole({
    communityId,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search role" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminRoleUiTable
          deleteRole={(role) => {
            if (!window.confirm('Are you sure?')) return
            return deleteRole(role.id)
          }}
          roles={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No roles found." />
      )}
    </UiStack>
  )
}
