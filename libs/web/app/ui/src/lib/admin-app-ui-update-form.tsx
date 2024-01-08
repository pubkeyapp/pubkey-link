import { Button, Group } from '@mantine/core'
import { AdminUpdateAppInput, App } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminAppUiUpdateForm({
  submit,
  app,
}: {
  submit: (res: AdminUpdateAppInput) => Promise<boolean>
  app: App
}) {
  const model: AdminUpdateAppInput = {
    avatarUrl: app.avatarUrl ?? '',
    name: app.name ?? '',
  }

  const fields: UiFormField<AdminUpdateAppInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar Url' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateAppInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
