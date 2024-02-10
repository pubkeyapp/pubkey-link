import { useUserFindOneRole } from '@pubkey-link/web-role-data-access'
import { UserRoleUiUpdateForm } from '@pubkey-link/web-role-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserRoleDetailSettingsTab({ roleId }: { roleId: string }) {
  const { item, query, updateRole } = useUserFindOneRole({ roleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Role not found." />
  }

  return (
    <UiCard>
      <UserRoleUiUpdateForm role={item} submit={updateRole} />
    </UiCard>
  )
}
