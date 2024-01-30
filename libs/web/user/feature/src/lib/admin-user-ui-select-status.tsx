import { getEnumOptions, UserStatus } from '@pubkey-link/sdk'
import { UiSelectEnumOption } from '@pubkey-link/web-ui-core'

export function AdminUserUiSelectStatus({
  value,
  setValue,
}: {
  value: UserStatus | undefined
  setValue: (value: UserStatus | undefined) => void
}) {
  return (
    <UiSelectEnumOption<UserStatus>
      value={value}
      setValue={setValue}
      options={[{ value: '', label: 'Filter by status' }, ...getEnumOptions(UserStatus)]}
    />
  )
}
