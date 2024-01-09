import { Avatar, AvatarProps, Tooltip } from '@mantine/core'
import { App, getRandomInt } from '@pubkey-link/sdk'
import { getColorByIndex } from '@pubkey-ui/core'

export function AppUiAvatar({
  app,
  tooltipLabel,
  ...props
}: Omit<AvatarProps, 'src'> & {
  app?: App
  tooltipLabel?: string
}) {
  const firstLetter = app?.name?.charAt(0) ?? '?'

  const content = app?.avatarUrl?.length ? (
    <Avatar radius="sm" src={app.avatarUrl} alt={`App ${app.name} avatar`} {...props} />
  ) : (
    <Avatar radius="sm" color={getColorByIndex(getRandomInt(app?.name ?? ''))} {...props}>
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

