import { Paper } from '@mantine/core'
import { Team } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { TeamUiItem } from './team-ui-item'

export function TeamUiGridItem({ team, to }: { team: Team; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <TeamUiItem team={team} to={to} />
        <UiDebugModal data={team} />
      </UiGroup>
    </Paper>
  )
}
