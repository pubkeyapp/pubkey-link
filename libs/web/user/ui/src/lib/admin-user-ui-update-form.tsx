import { Button, Group } from '@mantine/core'
import { AdminUpdateUserInput, getEnumOptions, User, UserRole, UserStatus } from '@pubkey-link/sdk'
import { formFieldCheckbox, formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminUiUpdateUserForm({
  submit,
  user,
}: {
  submit: (res: AdminUpdateUserInput) => Promise<boolean>
  user: User
}) {
  const model = {
    avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
    developer: user.developer ?? false,
    private: user.private ?? false,
    name: user.name ?? '',
    role: user.role ?? UserRole.User,
    status: user.status ?? UserStatus.Created,
    username: user.username ?? '',
  }

  const fields: UiFormField<AdminUpdateUserInput>[] = [
    formFieldSelect('role', { label: 'Role', options: getEnumOptions(UserRole) }),
    formFieldSelect('status', { label: 'Status', options: getEnumOptions(UserStatus) }),
    formFieldText('username', { label: 'Username' }),
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
    formFieldCheckbox('developer', { label: 'Developer' }),
    formFieldCheckbox('private', { label: 'Private' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateUserInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
