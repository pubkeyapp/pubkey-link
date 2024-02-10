import { useAdminFindOneRole } from '@pubkey-link/web-role-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminRoleDetailConditionsTab({ roleId }: { roleId: string }) {
  const { item, query } = useAdminFindOneRole({ roleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Role not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
