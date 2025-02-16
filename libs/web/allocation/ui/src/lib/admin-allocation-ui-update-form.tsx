import { Button, Group } from '@mantine/core'
import { AdminUpdateAllocationInput, Allocation } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminAllocationUiUpdateForm({
  submit,
  allocation,
}: {
  submit: (res: AdminUpdateAllocationInput) => Promise<boolean>
  allocation: Allocation
}) {
  const model: AdminUpdateAllocationInput = {
    name: allocation.name ?? '',

    description: allocation.description ?? '',

    url: allocation.url ?? '',
  }

  const fields: UiFormField<AdminUpdateAllocationInput>[] = [
    formFieldText('name', { label: 'name' }),

    formFieldText('description', { label: 'description' }),

    formFieldText('url', { label: 'url' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateAllocationInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
