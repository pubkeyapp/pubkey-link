import { Button, Group } from '@mantine/core'
import { AdminCreateRoleInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminRoleUiCreateForm({ submit }: { submit: (res: AdminCreateRoleInput) => Promise<boolean> }) {
  const model: AdminCreateRoleInput = {
    communityId: '',
    name: '',
  }

  const fields: UiFormField<AdminCreateRoleInput>[] = [formFieldText('name', { label: 'Name', required: true })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateRoleInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
