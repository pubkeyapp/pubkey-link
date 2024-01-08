import { Badge, type MantineColor } from '@mantine/core'
import { AppUserRole } from '@pubkey-link/sdk'
import { useUiColorScheme } from '@pubkey-ui/core'

export const APP_USER_ROLE_COLORS: Record<AppUserRole, MantineColor> = {
  [AppUserRole.Admin]: 'grape',
  [AppUserRole.User]: 'lime',
}

export function AppUserUiRoleBadge({ role }: { role: AppUserRole }) {
  const { colorScheme } = useUiColorScheme()
  return (
    <Badge color={APP_USER_ROLE_COLORS[role]} variant={colorScheme === 'dark' ? 'light' : 'outline'}>
      {role}
    </Badge>
  )
}
