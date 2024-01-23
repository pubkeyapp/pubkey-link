import { Button, Group } from '@mantine/core'
import { UserCreateBotInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserBotUiCreateForm({ submit }: { submit: (res: UserCreateBotInput) => Promise<boolean> }) {
  const model: UserCreateBotInput = {
    token: '',
    clientId: '',
    clientSecret: '',
    communityId: '',
  }

  const fields: UiFormField<UserCreateBotInput>[] = [
    formFieldText('token', { label: 'Token', required: true }),
    formFieldText('clientId', { label: 'Client ID', required: true }),
    formFieldText('clientSecret', { label: 'Client Secret', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateBotInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
