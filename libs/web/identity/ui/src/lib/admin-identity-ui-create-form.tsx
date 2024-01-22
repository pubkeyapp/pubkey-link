import { Button, Group } from '@mantine/core'
import { AdminCreateIdentityInput, getEnumOptions, IdentityProvider } from '@pubkey-link/sdk'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AuthUiIdentityCreateForm({ submit }: { submit: (res: AdminCreateIdentityInput) => Promise<boolean> }) {
  const model: AdminCreateIdentityInput = {
    provider: IdentityProvider.Solana,
    providerId: '',
    ownerId: '',
  }

  const fields: UiFormField<AdminCreateIdentityInput>[] = [
    formFieldText('providerId', {
      label: 'Provider ID',
    }),
    formFieldSelect('provider', {
      label: 'Provider',
      options: getEnumOptions(IdentityProvider),
    }),
  ]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateIdentityInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
