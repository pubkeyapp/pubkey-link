import { Badge, BadgeProps } from '@mantine/core'
import { NetworkCluster } from '@pubkey-link/sdk'

export function NetworkUiClusterBadge({ cluster, ...props }: BadgeProps & { cluster?: NetworkCluster }) {
  if (!cluster) return null
  return (
    <Badge variant="light" radius="sm" {...props}>
      {cluster.replace('Solana', 'Solana ')}
    </Badge>
  )
}
