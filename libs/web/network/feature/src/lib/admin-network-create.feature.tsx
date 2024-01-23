import { AdminCreateNetworkInput } from '@pubkey-link/sdk'
import { useAdminFindManyNetwork } from '@pubkey-link/web-network-data-access'
import { AdminNetworkUiCreateForm } from '@pubkey-link/web-network-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminNetworkCreateFeature() {
  const navigate = useNavigate()
  const { createNetwork } = useAdminFindManyNetwork()

  async function submit(input: AdminCreateNetworkInput) {
    return createNetwork(input)
      .then((res) => {
        if (res) {
          navigate(`/admin/networks/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Network">
      <UiCard>
        <AdminNetworkUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
