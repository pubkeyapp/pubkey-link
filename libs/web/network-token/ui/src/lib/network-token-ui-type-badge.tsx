import { Badge, BadgeProps, MantineColor } from '@mantine/core'
import { NetworkTokenType } from '@pubkey-link/sdk'

export function NetworkTokenUiTypeBadge({ type, ...props }: BadgeProps & { type: NetworkTokenType }) {
  const color: MantineColor = type === NetworkTokenType.Fungible ? 'indigo' : 'lime'
  return (
    <Badge size="xs" style={{ textTransform: 'inherit' }} color={color} {...props}>
      {type}
    </Badge>
  )
}
