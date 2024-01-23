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
    decimals: network.decimals,
    endpoint: network.endpoint,
    explorerUrl: network.explorerUrl,
    symbol: network.symbol,
  }

  const fields: UiFormField<AdminUpdateNetworkInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('decimals', { label: 'Decimals' }),
    formFieldText('endpoint', { label: 'Endpoint' }),
    formFieldText('explorerUrl', { label: 'ExplorerUrl' }),
    formFieldText('symbol', { label: 'Symbol' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateNetworkInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
