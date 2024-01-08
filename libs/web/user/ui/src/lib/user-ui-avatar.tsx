import { Avatar, AvatarProps, Tooltip } from '@mantine/core'
import { getRandomInt, User } from '@pubkey-link/sdk'
import { getColorByIndex } from '@pubkey-ui/core'

export function UserUiAvatar({
  user,
  tooltipLabel,
  ...props
}: Omit<AvatarProps, 'src'> & {
  user?: User
  tooltipLabel?: string
}) {
  const firstLetter = user?.username?.charAt(0) ?? '?'

  const content = user?.avatarUrl?.length ? (
    <Avatar radius={100} src={user.avatarUrl} alt={`User ${user.username} avatar`} {...props} />
  ) : (
    <Avatar radius={100} color={getColorByIndex(getRandomInt(user?.username ?? ''))} {...props}>
      {firstLetter?.toUpperCase()}
    </Avatar>
  )

  return tooltipLabel ? (
    <Tooltip label={tooltipLabel} withArrow>
      {content}
    </Tooltip>
  ) : (
    content
  )
}
