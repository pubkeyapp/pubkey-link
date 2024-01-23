import { AdminCreateBotInput } from '@pubkey-link/sdk'
import { useAdminFindManyBot } from '@pubkey-link/web-bot-data-access'
import { AdminBotUiCreateForm } from '@pubkey-link/web-bot-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminBotCreateFeature() {
  const navigate = useNavigate()
  const { createBot } = useAdminFindManyBot()

  async function submit(input: AdminCreateBotInput) {
    return createBot(input)
      .then((res) => {
        if (res) {
          navigate(`/admin/bots/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Bot">
      <UiCard>
        <AdminBotUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
