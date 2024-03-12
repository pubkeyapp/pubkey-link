import { getEnumOptions, UserStatus } from '@pubkey-link/sdk'
import { UiSelectEnum } from '@pubkey-ui/core'

export function AdminUserUiSelectStatus({
  value,
  setValue,
}: {
  value: UserStatus | undefined
  setValue: (value: UserStatus | undefined) => void
}) {
  return (
    <UiSelectEnum<UserStatus>
      value={value}
      setValue={setValue}
      placeholder="Filter by status"
      options={getEnumOptions(UserStatus)}
    />
  )
}
