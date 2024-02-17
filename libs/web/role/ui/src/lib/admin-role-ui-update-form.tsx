import { Button, Group } from '@mantine/core'
import { AdminUpdateRoleInput, Role } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminRoleUiUpdateForm({
  submit,
  role,
}: {
  submit: (res: AdminUpdateRoleInput) => Promise<boolean>
  role: Role
}) {
  const model: AdminUpdateRoleInput = {
    name: role.name ?? '',
  }

  const fields: UiFormField<AdminUpdateRoleInput>[] = [formFieldText('name', { label: 'Name' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateRoleInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
