import { UserCreateAppInput } from '@pubkey-link/sdk'
import { useUserFindManyApp } from '@pubkey-link/web-app-data-access'
import { UserAppUiCreateForm } from '@pubkey-link/web-app-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserAppCreateFeature() {
  const navigate = useNavigate()
  const { createApp } = useUserFindManyApp()

  async function submit(input: UserCreateAppInput) {
    return createApp(input)
      .then((res) => {
        if (res) {
          navigate(`/apps/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create App">
      <UiCard>
        <UserAppUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
