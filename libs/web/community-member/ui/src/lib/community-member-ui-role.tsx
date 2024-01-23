import { Badge, BadgeProps } from '@mantine/core'
import { CommunityRole } from '@pubkey-link/sdk'
import { useUiColorScheme } from '@pubkey-ui/core'

export const APP_MEMBER_ROLE_COLORS: Record<CommunityRole, string> = {
  [CommunityRole.Admin]: 'pink',
  [CommunityRole.Member]: 'blue',
}

export function CommunityMemberUiRole({ role, ...props }: BadgeProps & { role: CommunityRole }) {
  const { colorScheme } = useUiColorScheme()
  return (
    <Badge color={APP_MEMBER_ROLE_COLORS[role]} variant={colorScheme === 'dark' ? 'light' : 'outline'} {...props}>
      {role}
    </Badge>
  )
}
