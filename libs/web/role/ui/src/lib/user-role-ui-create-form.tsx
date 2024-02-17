import { Button, Group } from '@mantine/core'
import { UserCreateRoleInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserRoleUiCreateForm({ submit }: { submit: (res: UserCreateRoleInput) => Promise<boolean> }) {
  const model: UserCreateRoleInput = {
    communityId: '',
    name: '',
  }

  const fields: UiFormField<UserCreateRoleInput>[] = [formFieldText('name', { label: 'Name', required: true })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateRoleInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
