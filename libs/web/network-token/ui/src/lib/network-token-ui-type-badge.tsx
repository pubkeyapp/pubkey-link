import { Badge, BadgeProps, MantineColor } from '@mantine/core'
import { NetworkTokenType } from '@pubkey-link/sdk'
import { getNetworkTokenTypeColor } from './get-network-token-type-color'

export function NetworkTokenUiTypeBadge({ type, ...props }: BadgeProps & { type: NetworkTokenType }) {
  const color: MantineColor = getNetworkTokenTypeColor(type)
  return (
    <Badge size="xs" variant="dot" style={{ textTransform: 'inherit' }} color={color} {...props}>
      {type.replace('Non', 'Non ')}
    </Badge>
  )
}
