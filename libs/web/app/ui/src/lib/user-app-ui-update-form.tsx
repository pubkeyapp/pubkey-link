import { Button, Group } from '@mantine/core'
import { App, UserUpdateAppInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserAppUiUpdateForm({
  submit,
  app,
}: {
  submit: (res: UserUpdateAppInput) => Promise<boolean>
  app: App
}) {
  const model: UserUpdateAppInput = {
    avatarUrl: app.avatarUrl ?? '',
    name: app.name ?? '',
  }

  const fields: UiFormField<UserUpdateAppInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar Url' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateAppInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
