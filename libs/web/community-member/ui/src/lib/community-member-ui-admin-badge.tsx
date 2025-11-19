import { Badge, BadgeProps } from '@mantine/core'
import { CommunityMember } from '@pubkey-link/sdk'
import { useUiColorScheme } from '../../../../core/ui/src/lib/app-ui-theme'

export function CommunityMemberUiAdminBadge({ member, ...props }: BadgeProps & { member: CommunityMember }) {
  const { colorScheme } = useUiColorScheme()
  if (!member.admin) {
    return null
  }
  return (
    <Badge color="green" variant={colorScheme === 'dark' ? 'light' : 'outline'} {...props}>
      Community Admin
    </Badge>
  )
}
