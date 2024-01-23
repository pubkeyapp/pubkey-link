import { SimpleGrid } from '@mantine/core'
import type { Bot } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { BotUiGridItem } from './bot-ui-grid-item'

export function BotUiGrid({ bots = [] }: { bots: Bot[] }) {
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {bots.map((bot) => (
          <BotUiGridItem key={bot.id} to={bot.id} bot={bot} />
        ))}
      </SimpleGrid>
    </UiStack>
  )
}
