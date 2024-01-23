import { Bot } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-link/web-ui-core'

export type BotUiAvatarProps = UiAvatarProps & {
  bot?: Bot
}

export function BotUiAvatar({ bot, ...props }: BotUiAvatarProps) {
  return <UiAvatar avatarUrl={bot?.avatarUrl} name={bot?.name} {...props} />
}
