import { Paper } from '@mantine/core'
import type { NetworkToken } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { NetworkTokenUiItem } from './network-token-ui-item'

export function NetworkTokenUiGridItem({ networkToken, to }: { networkToken: NetworkToken; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <NetworkTokenUiItem networkToken={networkToken} to={to} />
        <UiDebugModal data={networkToken} />
      </UiGroup>
    </Paper>
  )
}
