import { Avatar, Button, Group, Text } from '@mantine/core'
import { Bot, DiscordServer } from '@pubkey-link/sdk'
import { useUserGetBotServer, useUserManageBot } from '@pubkey-link/web-bot-data-access'
import { UiAlert, UiDebug, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { UserBotDetailServerRoles } from './user-bot-detail-server-roles'

export function UserBotDetailServerDetail({ bot }: { bot: Bot }) {
  const { serverId } = useParams() as { serverId: string }
  const navigate = useNavigate()
  const query = useUserGetBotServer({ botId: bot.id, serverId })
  const { leaveServer } = useUserManageBot({ bot })
  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.item) {
    return <UiAlert message="Bot not found." />
  }

  const item: DiscordServer = query.data.item

  return (
    <UiStack>
      <Group>
        <Avatar src={item.icon} size="lg" alt={item.name} />
        <Text size="xl" fw={700}>
          {item.name}
        </Text>
      </Group>
      <Button
        size="xs"
        color="red"
        variant="outline"
        onClick={() => {
          if (!window.confirm('Are you sure you want to leave this server?')) {
            return
          }
          return leaveServer(item.id).then(() => navigate('..'))
        }}
      >
        Leave Server
      </Button>
      <UiTabRoutes
        tabs={[
          { path: 'roles', label: 'Roles', element: <UserBotDetailServerRoles botId={bot.id} serverId={serverId} /> },
          { path: 'debug', label: 'Debug', element: <UiDebug data={item} /> },
        ]}
      />
    </UiStack>
  )
}
