import { Paper } from '@mantine/core'
import { Allocation } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { AllocationUiItem } from './allocation-ui-item'

export function AllocationUiGridItem({ allocation, to }: { allocation: Allocation; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <AllocationUiItem allocation={allocation} to={to} />
        <UiDebugModal data={allocation} />
      </UiGroup>
    </Paper>
  )
}
