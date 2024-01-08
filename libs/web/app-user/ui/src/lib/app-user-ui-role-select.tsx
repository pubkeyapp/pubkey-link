import { Select, type SelectProps } from '@mantine/core'
import { AppUserRole, getEnumOptions } from '@pubkey-link/sdk'

export function AppUserUiRoleSelect({
  role,
  setRole,
  ...props
}: SelectProps & {
  role: AppUserRole | undefined
  setRole: (role: AppUserRole) => void
}) {
  return (
    <Select
      label="Role"
      required
      data={getEnumOptions(AppUserRole)}
      value={role}
      onChange={(value) => setRole(value as AppUserRole)}
      {...props}
    />
  )
}
