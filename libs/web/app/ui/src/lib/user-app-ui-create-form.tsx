import { Button, Group } from '@mantine/core'
import { UserCreateAppInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserAppUiCreateForm({ submit }: { submit: (res: UserCreateAppInput) => Promise<boolean> }) {
  const model: UserCreateAppInput = {
    name: '',
  }

  const fields: UiFormField<UserCreateAppInput>[] = [formFieldText('name', { label: 'Name', required: true })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateAppInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
