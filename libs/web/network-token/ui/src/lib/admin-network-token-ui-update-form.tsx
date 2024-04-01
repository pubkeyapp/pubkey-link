import { Button, Group } from '@mantine/core'
import { AdminUpdateNetworkTokenInput, NetworkToken, NetworkTokenType } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminNetworkTokenUiUpdateForm({
  submit,
  networkToken,
}: {
  submit: (res: AdminUpdateNetworkTokenInput) => Promise<boolean>
  networkToken: NetworkToken
}) {
  const model: AdminUpdateNetworkTokenInput = {
    name: networkToken.name ?? '',
    vault: networkToken.vault ?? '',
  }

  const fields: UiFormField<AdminUpdateNetworkTokenInput>[] = [formFieldText('name', { label: 'Name' })]
  if (networkToken.type === NetworkTokenType.NonFungible) {
    fields.push(
      formFieldText('vault', {
        label: 'Vault',
        description: `You can configure your Anybodies vault here using the format <vault>:<account>`,
      }),
    )
  }
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateNetworkTokenInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
