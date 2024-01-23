import { Paper } from '@mantine/core'
import type { Rule } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { RuleUiItem } from './rule-ui-item'

export function RuleUiGridItem({ rule, to }: { rule: Rule; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <RuleUiItem rule={rule} to={to} />
        <UiDebugModal data={rule} />
      </UiGroup>
    </Paper>
  )
}
