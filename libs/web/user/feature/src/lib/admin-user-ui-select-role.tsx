import { getEnumOptions, UserRole } from '@pubkey-link/sdk'
import { UiSelectEnumOption } from '@pubkey-link/web-ui-core'

export function AdminUserUiSelectRole({
  value,
  onChange,
}: {
  value: UserRole | undefined
  onChange: (role: UserRole | undefined) => void
}) {
  return (
    <UiSelectEnumOption<UserRole>
      value={value}
      onChange={onChange}
      options={[{ value: '', label: 'Filter by role' }, ...getEnumOptions(UserRole)]}
    />
  )
}
