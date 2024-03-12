import { getEnumOptions, UserRole } from '@pubkey-link/sdk'
import { UiSelectEnum } from '@pubkey-ui/core'

export function AdminUserUiSelectRole({
  value,
  setValue,
}: {
  value: UserRole | undefined
  setValue: (role: UserRole | undefined) => void
}) {
  return (
    <UiSelectEnum<UserRole>
      value={value}
      setValue={setValue}
      placeholder="Filter by role"
      clearable
      options={getEnumOptions(UserRole)}
    />
  )
}
