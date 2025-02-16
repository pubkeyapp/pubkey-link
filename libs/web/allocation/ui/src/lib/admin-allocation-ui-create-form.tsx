import { Button, Group } from '@mantine/core'
import { AdminCreateAllocationInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function AdminAllocationUiCreateForm({
  submit,
}: {
  submit: (res: AdminCreateAllocationInput) => Promise<boolean>
}) {
  const model: AdminCreateAllocationInput = {
    name: '',

    description: '',

    url: '',
  }

  const fields: UiFormField<AdminCreateAllocationInput>[] = [
    formFieldText('name', { label: 'name', required: true }),

    formFieldText('description', { label: 'description', required: true }),

    formFieldText('url', { label: 'url', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateAllocationInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
