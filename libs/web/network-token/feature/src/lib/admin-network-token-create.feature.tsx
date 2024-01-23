import { AdminCreateNetworkTokenInput, NetworkCluster } from '@pubkey-link/sdk'
import { useAdminFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { AdminNetworkTokenUiCreateForm } from '@pubkey-link/web-network-token-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminNetworkTokenCreateFeature({ cluster }: { cluster: NetworkCluster }) {
  const navigate = useNavigate()
  const { createNetworkToken } = useAdminFindManyNetworkToken({ cluster })

  async function submit(input: AdminCreateNetworkTokenInput) {
    return createNetworkToken(input)
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
    <UiPage leftAction={<UiBack />} title="Create NetworkToken">
      <UiCard>
        <AdminNetworkTokenUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
