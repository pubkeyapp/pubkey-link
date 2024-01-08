import { Button, Group } from '@mantine/core'
import { AdminCreateAppInput } from '@pubkey-link/sdk'
import { useAdminFindManyApp } from '@pubkey-link/web-app-data-access'
import { AdminAppUiCreateForm } from '@pubkey-link/web-app-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminAppCreateFeature() {
  const navigate = useNavigate()
  const { createApp } = useAdminFindManyApp()

  async function submit(input: AdminCreateAppInput) {
    return createApp(input)
      .then((res) => {
        if (res) {
          navigate(`/admin/apps/${res?.id}`)
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
        <AdminAppUiCreateForm submit={submit}>
          <Group justify="right">
            <Button type="submit">Create</Button>
          </Group>
        </AdminAppUiCreateForm>
      </UiCard>
    </UiPage>
  )
}
