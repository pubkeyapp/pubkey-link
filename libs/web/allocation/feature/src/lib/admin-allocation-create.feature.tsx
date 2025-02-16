import { AdminCreateAllocationInput } from '@pubkey-link/sdk'
import { useAdminFindManyAllocation } from '@pubkey-link/web-allocation-data-access'
import { AdminAllocationUiCreateForm } from '@pubkey-link/web-allocation-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminAllocationCreateFeature() {
  const navigate = useNavigate()
  const { createAllocation } = useAdminFindManyAllocation()

  async function submit(input: AdminCreateAllocationInput) {
    return createAllocation(input)
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
    <UiPage leftAction={<UiBack />} title="Create Allocation">
      <UiCard>
        <AdminAllocationUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
