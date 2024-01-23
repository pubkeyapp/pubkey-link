import { Button, Group } from '@mantine/core'
import { Rule, UserUpdateRuleInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserRuleUiUpdateForm({
  submit,
  rule,
}: {
  submit: (res: UserUpdateRuleInput) => Promise<boolean>
  rule: Rule
}) {
  const model: UserUpdateRuleInput = {
    name: rule.name ?? '',
    description: rule.description ?? '',
  }

  const fields: UiFormField<UserUpdateRuleInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('description', { label: 'Description' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateRuleInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
