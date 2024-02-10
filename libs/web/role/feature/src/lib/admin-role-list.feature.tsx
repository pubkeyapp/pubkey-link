import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { useAdminFindManyRole } from '@pubkey-link/web-role-data-access'
import { AdminRoleUiTable } from '@pubkey-link/web-role-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminRoleListFeature({ communityId }: { communityId: string }) {
  const { deleteRole, items, pagination, query, setSearch } = useAdminFindManyRole({
    communityId,
  })

  return (
    <UiPage
      title="Roles"
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
        <UiSearchField placeholder="Search role" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
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
    </UiPage>
  )
}
