import { Button, Group } from '@mantine/core'
import { UserCreateRuleInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserRuleUiCreateForm({ submit }: { submit: (res: UserCreateRuleInput) => Promise<boolean> }) {
  const model: UserCreateRuleInput = {
    communityId: '',
    name: '',
    description: '',
  }

  const fields: UiFormField<UserCreateRuleInput>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('description', { label: 'Description', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateRuleInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
