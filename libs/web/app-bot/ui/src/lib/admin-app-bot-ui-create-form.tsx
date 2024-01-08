import { Button, Group } from '@mantine/core'
import { AdminCreateAppBotInput, AppBotProvider } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminAppBotUiCreateForm({ submit }: { submit: (res: AdminCreateAppBotInput) => Promise<boolean> }) {
  const model: AdminCreateAppBotInput = {
    appId: '',
    clientId: '',
    clientSecret: '',
    name: '',
    provider: AppBotProvider.Discord,
    token: '',
  }

  const fields: UiFormField<AdminCreateAppBotInput>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('clientId', { label: 'Client ID', required: true }),
    formFieldText('clientSecret', { label: 'Client Secret', required: true }),
    formFieldText('token', { label: 'Token', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateAppBotInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
