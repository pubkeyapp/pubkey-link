import { Anchor, Avatar, Grid, NavLink, ScrollArea, Text } from '@mantine/core'
import { Bot, DiscordServer } from '@pubkey-link/sdk'
import { useUserGetBotServers } from '@pubkey-link/web-bot-data-access'
import { UiAlert, UiCard, UiLoader } from '@pubkey-ui/core'
import { IconChevronRight } from '@tabler/icons-react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

import { UserBotDetailServerDetail } from './user-bot-detail-server-detail'

export function UserBotDetailServerList({ bot }: { bot: Bot }) {
  const query = useUserGetBotServers({ botId: bot.id })
  const { pathname } = useLocation()
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
    <Grid h="100%">
      <Grid.Col span={3} h="100%" style={{ overflow: 'auto' }}>
        <ScrollArea h="100%">
          {items?.map((item) => (
            <NavLink
              component={Link}
              to={`./${item.id}`}
              key={item.id}
              label={item.name}
              leftSection={<Avatar src={item.icon} size="2rem" />}
              rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
              active={pathname.includes(item.id)}
              variant="filled"
            />
          ))}
        </ScrollArea>
      </Grid.Col>
      <Grid.Col span={9}>
        <Routes>
          <Route index element={<UiAlert message={`Select a server`} />} />
          <Route path=":serverId/*" element={<UserBotDetailServerDetail botId={bot.id} />} />
        </Routes>
      </Grid.Col>
    </Grid>
  )
}

// export function WebAdminBotDetailServersTab({ botId }: { botId: string }) {
//   const { bot } = useAdminFindOneBot({ botId })
//
//   return bot ? (
//     bot?.started ? (
//       <WebAdminUiBotServers bot={bot} />
//     ) : (
//       <UiAlert message="Bot not started." />
//     )
//   ) : (
//     <UiAlert message="Bot not found." />
//   )
// }
