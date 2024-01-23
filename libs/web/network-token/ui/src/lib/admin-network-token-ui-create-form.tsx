import { Button, Group } from '@mantine/core'
import { AdminCreateNetworkTokenInput, NetworkCluster } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminNetworkTokenUiCreateForm({
  submit,
}: {
  submit: (res: AdminCreateNetworkTokenInput) => Promise<boolean>
}) {
  const model: AdminCreateNetworkTokenInput = {
    cluster: NetworkCluster.SolanaMainnet,
    account: '',
  }

  const fields: UiFormField<AdminCreateNetworkTokenInput>[] = [
    formFieldText('account', { label: 'Account', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateNetworkTokenInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
