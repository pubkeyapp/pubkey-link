import { Avatar, Indicator } from '@mantine/core'
import { Bot, getRandomInt } from '@pubkey-link/sdk'
import { UiAvatarProps } from '@pubkey-link/web-ui-core'
import { getColorByIndex, UiAnchor } from '@pubkey-ui/core'

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
    <Avatar radius={100} color={getColorByIndex(getRandomInt(name ?? ''))} {...props}>
      {firstLetter?.toUpperCase()}
    </Avatar>
  )
  const color = bot?.started ? 'green' : 'red'

  return (
    <UiAnchor to={to ?? undefined}>
      <Indicator offset={4} color={color}>
        {avatar}
      </Indicator>
    </UiAnchor>
  )
}
