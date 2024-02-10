import { Paper } from '@mantine/core'
import type { Role } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { RoleUiItem } from './role-ui-item'

export function RoleUiGridItem({ role, to }: { role: Role; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <RoleUiItem role={role} to={to} />
        <UiDebugModal data={role} />
      </UiGroup>
    </Paper>
  )
}
