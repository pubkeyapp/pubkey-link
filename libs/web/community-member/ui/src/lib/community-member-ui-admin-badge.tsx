import { Badge, BadgeProps } from '@mantine/core'
import { CommunityMember } from '@pubkey-link/sdk'
import { useUiColorScheme } from '@pubkey-ui/core'

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
