import { useAdminFindOneRole } from '@pubkey-link/web-role-data-access'
import { AdminRoleUiUpdateForm } from '@pubkey-link/web-role-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminRoleDetailSettingsTab({ roleId }: { roleId: string }) {
  const { item, query, updateRole } = useAdminFindOneRole({ roleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Role not found." />
  }

  return (
    <UiCard>
      <AdminRoleUiUpdateForm role={item} submit={updateRole} />
    </UiCard>
  )
}
