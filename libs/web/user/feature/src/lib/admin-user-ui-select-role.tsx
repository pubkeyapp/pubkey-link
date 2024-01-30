import { getEnumOptions, UserRole } from '@pubkey-link/sdk'
import { UiSelectEnumOption } from '@pubkey-link/web-ui-core'

export function AdminUserUiSelectRole({
  value,
  setValue,
}: {
  value: UserRole | undefined
  setValue: (role: UserRole | undefined) => void
}) {
  return (
    <UiSelectEnumOption<UserRole>
      value={value}
      setValue={setValue}
      options={[{ value: '', label: 'Filter by role' }, ...getEnumOptions(UserRole)]}
    />
  )
}
