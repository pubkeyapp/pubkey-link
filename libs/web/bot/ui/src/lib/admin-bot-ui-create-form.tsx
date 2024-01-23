import { Button, Group } from '@mantine/core'
import { AdminCreateBotInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminBotUiCreateForm({ submit }: { submit: (res: AdminCreateBotInput) => Promise<boolean> }) {
  const model: AdminCreateBotInput = {
    token: '',
    clientId: '',
    clientSecret: '',
    communityId: '',
  }

  const fields: UiFormField<AdminCreateBotInput>[] = [
    formFieldText('token', { label: 'token', required: true }),
    formFieldText('clientId', { label: 'clientId', required: true }),
    formFieldText('clientSecret', { label: 'clientSecret', required: true }),
    formFieldText('communityId', { label: 'communityId', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateBotInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
