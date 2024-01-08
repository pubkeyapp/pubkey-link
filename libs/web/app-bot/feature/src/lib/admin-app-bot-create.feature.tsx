import { AdminCreateAppBotInput } from '@pubkey-link/sdk'
import { useAdminFindManyAppBot } from '@pubkey-link/web-app-bot-data-access'
import { AdminAppBotUiCreateForm } from '@pubkey-link/web-app-bot-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminAppBotCreateFeature({ appId }: { appId: string }) {
  const navigate = useNavigate()
  const { createAppBot } = useAdminFindManyAppBot({ appId })

  async function submit(input: AdminCreateAppBotInput) {
    return createAppBot(input)
      .then((res) => {
        if (res) {
          navigate(`/admin/apps/${res.appId}/bots/${res.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create AppBot">
      <UiCard>
        <AdminAppBotUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
