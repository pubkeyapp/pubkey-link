import { type LoginInput, RegisterInput } from '@pubkey-link/sdk'
import { formFieldPassword, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { ReactNode, useState } from 'react'

export type AuthUiFormInput = LoginInput | RegisterInput

export function AuthUiForm({
  children,
  submit,
}: {
  children?: ReactNode
  submit: (res: AuthUiFormInput) => Promise<boolean>
}) {
  const [model] = useState<AuthUiFormInput>({
    username: '',
    password: '',
  })
  const fields: UiFormField<AuthUiFormInput>[] = [
    formFieldText('username', {
      placeholder: 'Username',
      required: true,
    }),
    formFieldPassword('password', {
      placeholder: 'Password',
      required: true,
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AuthUiFormInput)}>
      {children}
    </UiForm>
  )
}
