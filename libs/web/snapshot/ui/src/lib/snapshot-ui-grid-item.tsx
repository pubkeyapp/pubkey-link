import { Paper } from '@mantine/core'
import { Snapshot } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { SnapshotUiItem } from './snapshot-ui-item'

export function SnapshotUiGridItem({ snapshot, to }: { snapshot: Snapshot; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <SnapshotUiItem snapshot={snapshot} to={to} />
        <UiDebugModal data={snapshot} />
      </UiGroup>
    </Paper>
  )
}
