import { Button, Group } from '@mantine/core'
import { BotServer, UserUpdateBotServerInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserBotServerUiUpdateForm({
  submit,
  botServer,
}: {
  submit: (res: UserUpdateBotServerInput) => Promise<boolean>
  botServer: BotServer
}) {
  const model: UserUpdateBotServerInput = {
    name: botServer.name,
  }

  const fields: UiFormField<UserUpdateBotServerInput>[] = [formFieldText('name', { label: 'Name' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateBotServerInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
