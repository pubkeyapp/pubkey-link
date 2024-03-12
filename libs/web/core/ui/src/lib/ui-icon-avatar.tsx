import { Avatar, Tooltip } from '@mantine/core'
import { getColorByIndex, getIntFromString, UiAvatarProps } from '@pubkey-ui/core'
import { ComponentType } from 'react'

export function UiIconAvatar({
  name,
  tooltipLabel,
  icon: Icon,
  ...props
}: UiAvatarProps & { icon?: ComponentType<{ color?: string; size: number }> | null }) {
  const firstLetter = name?.charAt(0) ?? '?'

  const content = (
    <Avatar
      radius={100}
      color={getColorByIndex(getIntFromString(name ?? ''))}
      alt={`${name} avatar`}
      styles={{ placeholder: { fontSize: 24 } }}
      {...props}
    >
      {Icon ? <Icon size={28} /> : firstLetter?.toUpperCase()}
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
