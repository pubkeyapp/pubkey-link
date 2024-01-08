import { Button, Group } from '@mantine/core'
import { AdminUpdateAppBotInput, AppBot } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminAppBotUiUpdateForm({
  submit,
  appBot,
}: {
  submit: (res: AdminUpdateAppBotInput) => Promise<boolean>
  appBot: AppBot
}) {
  const model: AdminUpdateAppBotInput = {
    clientId: appBot.clientId ?? '',
    clientSecret: appBot.clientSecret ?? '',
    name: appBot.name ?? '',
    token: appBot.token ?? '',
  }

  const fields: UiFormField<AdminUpdateAppBotInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('clientId', { label: 'Client ID' }),
    formFieldText('clientSecret', { label: 'Client Secret' }),
    formFieldText('token', { label: 'Token' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateAppBotInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
