import { useAdminFindOneUser } from '@pubkey-link/web-user-data-access'
import { AdminUiUpdateUserForm } from '@pubkey-link/web-user-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminUserDetailFeatureSettings({ userId }: { userId: string }) {
  const { item, query, updateUser } = useAdminFindOneUser({ userId })
  if (query.isLoading) {
    return <UiLoader />
  }

  if (!item) {
    return <UiError message="User not found" />
  }

  return (
    <UiCard>
      <AdminUiUpdateUserForm user={item} submit={updateUser} />
    </UiCard>
  )
}
