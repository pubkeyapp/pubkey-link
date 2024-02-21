import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Role, UserCreateSnapshotInput } from '@pubkey-link/sdk'
import { useUserFindManyRole } from '@pubkey-link/web-role-data-access'
import { useUserFindManySnapshot } from '@pubkey-link/web-snapshot-data-access'
import { UserSnapshotUiTable } from '@pubkey-link/web-snapshot-ui'
import { UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserSnapshotListFeature({ communityId }: { communityId: string }) {
  const { items: roles } = useUserFindManyRole({ communityId })
  const { deleteSnapshot, items, pagination, query, createSnapshot, setSearch } = useUserFindManySnapshot({
    communityId,
    limit: 12,
  })
  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search snapshot" setSearch={setSearch} />
        <UiDebugModal data={items} />
        <CreateSnapshot createSnapshot={createSnapshot} roles={roles} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserSnapshotUiTable
          deleteSnapshot={(snapshot) => {
            if (!window.confirm('Are you sure?')) return
            return deleteSnapshot(snapshot.id)
          }}
          snapshots={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No snapshots found" />
      )}
    </UiStack>
  )
}

function CreateSnapshot({
  createSnapshot,
  roles,
}: {
  createSnapshot: (input: UserCreateSnapshotInput) => Promise<boolean>
  roles: Role[]
}) {
  return (
    <Button
      onClick={() =>
        modals.open({
          title: 'Create Snapshot',
          children: (
            <UiStack>
              {roles.map((role) => {
                return <Button onClick={() => createSnapshot({ roleId: role.id })}>{role.name}</Button>
              })}
            </UiStack>
          ),
        })
      }
    >
      Create
    </Button>
  )
}
