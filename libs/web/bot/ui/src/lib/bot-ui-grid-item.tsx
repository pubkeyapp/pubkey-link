import { Paper } from '@mantine/core'
import { Bot } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { BotUiItem } from './bot-ui-item'

export function BotUiGridItem({ bot, to }: { bot: Bot; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <BotUiItem bot={bot} to={to} />
        <UiDebugModal data={bot} />
      </UiGroup>
    </Paper>
  )
}
