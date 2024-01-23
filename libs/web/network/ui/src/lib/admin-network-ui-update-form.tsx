import { Button, Group } from '@mantine/core'
import { AdminUpdateNetworkInput, Network } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminNetworkUiUpdateForm({
  submit,
  network,
}: {
  submit: (res: AdminUpdateNetworkInput) => Promise<boolean>
  network: Network
}) {
  const model: AdminUpdateNetworkInput = {
    name: network.name,
    endpoint: network.endpoint,
  }

  const fields: UiFormField<AdminUpdateNetworkInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('endpoint', { label: 'Endpoint' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateNetworkInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
