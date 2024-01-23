import { Button, Group } from '@mantine/core'
import { AdminUpdateBotInput, Bot } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminBotUiUpdateForm({
  submit,
  bot,
}: {
  submit: (res: AdminUpdateBotInput) => Promise<boolean>
  bot: Bot
}) {
  const model: AdminUpdateBotInput = {
    name: bot.name,
    avatarUrl: bot.avatarUrl ?? '',
    token: '',
    clientId: '',
    clientSecret: '',
    communityId: bot.communityId,
  }

  const fields: UiFormField<AdminUpdateBotInput>[] = [
    formFieldText('name', { label: 'name' }),
    formFieldText('avatarUrl', { label: 'avatarUrl' }),
    formFieldText('token', { label: 'token' }),
    formFieldText('clientId', { label: 'clientId' }),
    formFieldText('clientSecret', { label: 'clientSecret' }),
    formFieldText('communityId', { label: 'communityId' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateBotInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
