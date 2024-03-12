import { Team } from '@pubkey-link/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type TeamUiAvatarProps = UiAvatarProps & {
  team?: Team
}

export function TeamUiAvatar({ team, ...props }: TeamUiAvatarProps) {
  return <UiAvatar size="sm" radius="sm" url={team?.avatarUrl} name={team?.name} {...props} />
}
