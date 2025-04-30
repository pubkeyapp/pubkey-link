import { Badge, BadgeProps, MantineColor } from '@mantine/core'
import { NetworkToken } from '@pubkey-link/sdk'

export function NetworkTokenUiCache({ token, ...props }: BadgeProps & { token: NetworkToken }) {
  const color: MantineColor = token.cache ? 'green' : 'red'
  return (
    <Badge size="xs" variant="dot" style={{ textTransform: 'inherit' }} color={color} {...props}>
      {token.cache ? 'Cached' : 'Not cached'}
    </Badge>
  )
}
