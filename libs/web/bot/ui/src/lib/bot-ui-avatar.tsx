import { Avatar, Indicator } from '@mantine/core'
import { Bot } from '@pubkey-link/sdk'
import { getColorByIndex, getIntFromString, UiAnchor, UiAvatarProps } from '@pubkey-ui/core'

export type BotUiAvatarProps = UiAvatarProps & {
  bot?: Bot
  to?: string | null
}

export function BotUiAvatar({ bot, to, ...props }: BotUiAvatarProps) {
  const { avatarUrl, name } = bot ?? {}
  const firstLetter = name?.charAt(0) ?? '?'

  const avatar = avatarUrl?.length ? (
    <Avatar radius={100} src={avatarUrl} alt={`${name} avatar`} {...props} />
  ) : (
    <Avatar radius={100} color={getColorByIndex(getIntFromString(name ?? ''))} {...props}>
      {firstLetter?.toUpperCase()}
    </Avatar>
  )
  const color = bot?.started ? 'green' : 'gray'

  return (
    <UiAnchor to={to ?? undefined}>
      <Indicator offset={4} color={color}>
        {avatar}
      </Indicator>
    </UiAnchor>
  )
}
