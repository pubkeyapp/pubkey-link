import { Button, Group } from '@mantine/core'
import { AdminCreateAppInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminAppUiCreateForm({ submit }: { submit: (res: AdminCreateAppInput) => Promise<boolean> }) {
  const model: AdminCreateAppInput = {
    avatarUrl: '',
    name: '',
  }

  const fields: UiFormField<AdminCreateAppInput>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('avatarUrl', { label: 'Avatar Url' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateAppInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
