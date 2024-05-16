import { Button, Group } from '@mantine/core'
import { AdminUpdateNetworkInput, Network } from '@pubkey-link/sdk'
import { formFieldCheckbox, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminNetworkUiUpdateForm({
  submit,
  network,
}: {
  submit: (res: AdminUpdateNetworkInput) => Promise<boolean>
  network: Network
}) {
  const model: AdminUpdateNetworkInput = {
    name: network.name,
    enableSync: network.enableSync,
    endpoint: network.endpoint,
  }

  const fields: UiFormField<AdminUpdateNetworkInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('endpoint', { label: 'Endpoint' }),
    formFieldCheckbox('enableSync', {
      label: 'Enable Sync',
      description: 'If enabled, the network assets from the identities will be synced',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateNetworkInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
