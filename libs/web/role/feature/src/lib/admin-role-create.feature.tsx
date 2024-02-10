import { AdminCreateRoleInput } from '@pubkey-link/sdk'
import { useAdminFindManyRole } from '@pubkey-link/web-role-data-access'
import { AdminRoleUiCreateForm } from '@pubkey-link/web-role-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminRoleCreateFeature({ communityId }: { communityId: string }) {
  const navigate = useNavigate()
  const { createRole } = useAdminFindManyRole({ communityId })

  async function submit(input: AdminCreateRoleInput) {
    return createRole(input)
      .then((res) => {
        if (res) {
          navigate(`../${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Role">
      <UiCard>
        <AdminRoleUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
