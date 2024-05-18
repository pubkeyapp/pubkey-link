import { Badge } from '@mantine/core'
import { Network } from '@pubkey-link/sdk'

export function NetworkUiSyncBadge({ network }: { network: Network }) {
  return (
    <Badge variant="dot" color={network.enableSync ? 'lime' : 'orange'} size="xs">
      Sync {network.enableSync ? 'Enabled' : 'Disabled'}
    </Badge>
  )
}
