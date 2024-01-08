import { AdminCreateAppInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function AdminAppUiCreateForm({
  children,
  submit,
}: {
  children?: ReactNode
  submit: (res: AdminCreateAppInput) => Promise<boolean>
}) {
  const model: AdminCreateAppInput = {
    avatarUrl: '',
    name: '',
  }

  const fields: UiFormField<AdminCreateAppInput>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('avatarUrl', { label: 'Avatar Url' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateAppInput)}>
      {children}
    </UiForm>
  )
}
