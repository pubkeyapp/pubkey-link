import { Button, Group } from '@mantine/core'
import { AdminCreateNetworkInput, getEnumOptions, NetworkCluster, NetworkType } from '@pubkey-link/sdk'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminNetworkUiCreateForm({ submit }: { submit: (res: AdminCreateNetworkInput) => Promise<boolean> }) {
  const model: AdminCreateNetworkInput = {
    cluster: NetworkCluster.SolanaMainnet,
    decimals: 9,
    endpoint: '',
    explorerUrl: '',
    name: '',
    symbol: '',
    type: NetworkType.Solana,
  }

  const fields: UiFormField<AdminCreateNetworkInput>[] = [
    formFieldSelect('cluster', { label: 'Cluster', required: true, options: getEnumOptions(NetworkCluster) }),
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('decimals', { label: 'Decimals', required: true }),
    formFieldText('endpoint', { label: 'Endpoint', required: true }),
    formFieldText('explorerUrl', { label: 'ExplorerUrl', required: true }),
    formFieldText('symbol', { label: 'Symbol', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateNetworkInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
