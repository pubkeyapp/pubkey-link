import { Button, Group } from '@mantine/core'
import { Bot, UserUpdateBotInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserBotUiUpdateForm({
  submit,
  bot,
}: {
  submit: (res: UserUpdateBotInput) => Promise<boolean>
  bot: Bot
}) {
  const model: UserUpdateBotInput = {
    name: bot.name,
    avatarUrl: bot.avatarUrl ?? '',
    token: '',
    clientId: '',
    clientSecret: '',
  }

  const fields: UiFormField<UserUpdateBotInput>[] = [
    formFieldText('name', { label: 'name' }),
    formFieldText('avatarUrl', { label: 'avatarUrl' }),
    formFieldText('token', { label: 'token' }),
    formFieldText('clientId', { label: 'clientId' }),
    formFieldText('clientSecret', { label: 'clientSecret' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateBotInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
