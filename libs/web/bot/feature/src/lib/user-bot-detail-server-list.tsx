import { Anchor, SimpleGrid, Text } from '@mantine/core'
import { Bot, DiscordServer } from '@pubkey-link/sdk'
import { useUserGetBotServers } from '@pubkey-link/web-bot-data-access'
import { UiDiscordServerItem } from '@pubkey-link/web-core-ui'
import { UiAlert, UiCard, UiLoader } from '@pubkey-ui/core'
import { Navigate, Route, Routes } from 'react-router-dom'

import { UserBotDetailServerDetail } from './user-bot-detail-server-detail'

export function UserBotDetailServerList({ bot }: { bot: Bot }) {
  const query = useUserGetBotServers({ botId: bot.id })
  if (query.isLoading) {
    return <UiLoader />
  }
  if (!query.data) {
    return <UiAlert message="Bot not found." />
  }

  const items: DiscordServer[] = query.data?.items ?? []

  if (!items.length) {
    return (
      <UiCard title="No servers found.">
        <Text size="sm" c="dimmed">
          <Anchor href={bot.inviteUrl} target="_blank">
            Invite the bot
          </Anchor>{' '}
          to a server to get started.
        </Text>
      </UiCard>
    )
  }
  return (
    <Routes>
      <Route index element={<UserBotDetailDetail items={items} />} />
      <Route path=":serverId/*" element={<UserBotDetailServerDetail bot={bot} />} />
    </Routes>
  )
}

function UserBotDetailDetail({ items }: { items: DiscordServer[] }) {
  if (items.length === 1) {
    return <Navigate replace to={`./${items[0].id}`} />
  }

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      {items?.map((item) => (
        <UiCard key={item.id}>
          <UiDiscordServerItem server={item} to={`./${item.id}`} />
        </UiCard>
      ))}
    </SimpleGrid>
  )
}
