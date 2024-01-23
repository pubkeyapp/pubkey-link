import { Button, Group } from '@mantine/core'
import { AdminCreateRuleInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminRuleUiCreateForm({ submit }: { submit: (res: AdminCreateRuleInput) => Promise<boolean> }) {
  const model: AdminCreateRuleInput = {
    communityId: '',
    name: '',
    description: '',
  }

  const fields: UiFormField<AdminCreateRuleInput>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('description', { label: 'Description', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateRuleInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
