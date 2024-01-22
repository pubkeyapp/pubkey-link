import { Avatar, AvatarProps, Tooltip } from '@mantine/core'
import { getRandomInt } from '@pubkey-link/sdk'
import { getColorByIndex } from '@pubkey-ui/core'

export type UiAvatarProps = Omit<AvatarProps, 'src'> & {
  avatarUrl?: string | null
  name?: string | null
  tooltipLabel?: string
}

export function UiAvatar({ avatarUrl, name, tooltipLabel, ...props }: UiAvatarProps) {
  const firstLetter = name?.charAt(0) ?? '?'

  const content = avatarUrl?.length ? (
    <Avatar radius={100} src={avatarUrl} alt={`${name} avatar`} {...props} />
  ) : (
    <Avatar radius={100} color={getColorByIndex(getRandomInt(name ?? ''))} {...props}>
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
