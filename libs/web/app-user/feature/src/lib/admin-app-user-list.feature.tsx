import { Group } from '@mantine/core'
import { AdminCreateAppUserInput } from '@pubkey-link/sdk'
import { useAdminFindManyAppUser } from '@pubkey-link/web-app-user-data-access'
import { AdminAppUserUiCreateForm, AdminAppUserUiTable } from '@pubkey-link/web-app-user-ui'
import { UiModalButton, UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { toastError, UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminAppUserListFeature({ appId }: { appId: string }) {
  const { deleteAppUser, createAppUser, updateAppUser, items, pagination, query, setSearch } = useAdminFindManyAppUser({
    appId,
  })

  async function submit(input: AdminCreateAppUserInput) {
    return createAppUser(input).catch((err) => {
      toastError(err.message)
      return false
    })
  }

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search user" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiDebugModal data={items} />
        <UiModalButton label="Add User" title="Add User to App">
          <AdminAppUserUiCreateForm submit={submit} />
        </UiModalButton>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminAppUserUiTable
          deleteAppUser={(appUserId) => deleteAppUser(appUserId)}
          updateAppUser={(appUserId, input) => updateAppUser(appUserId, input)}
          appUsers={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No users found" />
      )}
    </UiStack>
  )
}
