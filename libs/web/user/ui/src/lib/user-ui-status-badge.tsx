import { Badge } from '@mantine/core'
import { UserStatus } from '@pubkey-link/sdk'
import { useUiColorScheme } from '@pubkey-ui/core'

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  [UserStatus.Active]: 'green',
  [UserStatus.Created]: 'blue',
  [UserStatus.Inactive]: 'gray',
}

export function UserUiStatusBadge({ status }: { status: UserStatus }) {
  const { colorScheme } = useUiColorScheme()
  return (
    <Badge color={USER_STATUS_COLORS[status]} variant={colorScheme === 'dark' ? 'light' : 'outline'}>
      {status}
    </Badge>
  )
}
