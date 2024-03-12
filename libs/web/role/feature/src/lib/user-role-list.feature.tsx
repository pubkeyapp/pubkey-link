import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Community } from '@pubkey-link/sdk'
import { useUserFindManyRole, useUserSyncCommunityRoles } from '@pubkey-link/web-role-data-access'
import { UserRoleUiTable } from '@pubkey-link/web-role-ui'
import { UiSearchField } from '@pubkey-link/web-core-ui'
import { UiDebug, UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function UserRoleListFeature({ community }: { community: Community }) {
  const { deleteRole, items, pagination, query, setSearch } = useUserFindManyRole({
    communityId: community.id,
  })

  const syncCommunityRoles = useUserSyncCommunityRoles({ communityId: community.id })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search role" setSearch={setSearch} />
        <UiDebugModal data={items} />

        <Button
          loading={syncCommunityRoles.isPending}
          onClick={() => {
            syncCommunityRoles.mutateAsync().then((result) => {
              modals.open({
                size: 'xl',
                children: <UiDebug data={result} open hideButton />,
              })
            })
          }}
        >
          Sync Roles
        </Button>
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserRoleUiTable
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
