import { AdminCreateResolverInput, NetworkCluster } from '@pubkey-link/sdk'
import { useAdminFindManyResolver } from '@pubkey-link/web-resolver-data-access'
import { AdminResolverUiCreateForm } from '@pubkey-link/web-resolver-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminResolverCreateFeature({ cluster }: { cluster: NetworkCluster }) {
  const navigate = useNavigate()
  const { createResolver } = useAdminFindManyResolver({ cluster })

  async function submit(input: AdminCreateResolverInput) {
    return createResolver(input)
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
    <UiPage leftAction={<UiBack />} title="Create Resolver">
      <UiCard>
        <AdminResolverUiCreateForm cluster={cluster} submit={submit} />
      </UiCard>
    </UiPage>
  )
}
