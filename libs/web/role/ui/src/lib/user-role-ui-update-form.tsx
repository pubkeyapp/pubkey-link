import { Button, Group } from '@mantine/core'
import { Role, UserUpdateRoleInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserRoleUiUpdateForm({
  submit,
  role,
}: {
  submit: (res: UserUpdateRoleInput) => Promise<boolean>
  role: Role
}) {
  const model: UserUpdateRoleInput = {
    name: role.name ?? '',
  }

  const fields: UiFormField<UserUpdateRoleInput>[] = [formFieldText('name', { label: 'Name' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateRoleInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
