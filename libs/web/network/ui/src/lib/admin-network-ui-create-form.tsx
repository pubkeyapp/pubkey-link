import { Button, Group } from '@mantine/core'
import { AdminCreateNetworkInput, getEnumOptions, NetworkCluster } from '@pubkey-link/sdk'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminNetworkUiCreateForm({ submit }: { submit: (res: AdminCreateNetworkInput) => Promise<boolean> }) {
  const model: AdminCreateNetworkInput = {
    cluster: NetworkCluster.SolanaMainnet,
    endpoint: '',
    name: '',
  }

  const fields: UiFormField<AdminCreateNetworkInput>[] = [
    formFieldSelect('cluster', { label: 'Cluster', required: true, options: getEnumOptions(NetworkCluster) }),
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('endpoint', { label: 'Endpoint', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateNetworkInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
