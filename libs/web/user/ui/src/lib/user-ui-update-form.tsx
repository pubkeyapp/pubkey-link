import { Button, Group } from '@mantine/core'
import { User, UserUpdateUserInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserUiUpdateForm({
  submit,
  user,
}: {
  submit: (res: UserUpdateUserInput) => Promise<boolean>
  user: User
}) {
  const model: UserUpdateUserInput = {
    avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
    developer: user.developer ?? false,
    name: user.name ?? '',
  }

  const fields: UiFormField<UserUpdateUserInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateUserInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
