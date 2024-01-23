import { Button, Group } from '@mantine/core'
import { AdminUpdateRuleInput, Rule } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminRuleUiUpdateForm({
  submit,
  rule,
}: {
  submit: (res: AdminUpdateRuleInput) => Promise<boolean>
  rule: Rule
}) {
  const model: AdminUpdateRuleInput = {
    name: rule.name ?? '',
    description: rule.description ?? '',
  }

  const fields: UiFormField<AdminUpdateRuleInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('description', { label: 'Description' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateRuleInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
