import { Paper } from '@mantine/core'
import { Network } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { NetworkUiItem } from './network-ui-item'

export function NetworkUiGridItem({ network, to }: { network: Network; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <NetworkUiItem network={network} to={to} />
        <UiDebugModal data={network} />
      </UiGroup>
    </Paper>
  )
}
