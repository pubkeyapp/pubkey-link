import { Paper } from '@mantine/core'
import type { User } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { UserUiItem } from './user-ui-item'

export function UserUiGridItem({ user, to }: { user: User; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <UserUiItem user={user} to={to} />
        <UiDebugModal data={user} />
      </UiGroup>
    </Paper>
  )
}
