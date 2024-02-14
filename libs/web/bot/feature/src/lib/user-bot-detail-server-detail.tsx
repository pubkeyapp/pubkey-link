import { Button, Group } from '@mantine/core'
import { Bot, DiscordServer } from '@pubkey-link/sdk'
import { useUserGetBotServer, useUserManageBot } from '@pubkey-link/web-bot-data-access'
import { UiDiscordServerItem } from '@pubkey-link/web-ui-core'
import { UiAlert, UiCard, UiDebug, UiGroup, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { UserBotDetailServerMembers } from './user-bot-detail-server-members'
import { UserBotDetailServerRoles } from './user-bot-detail-server-roles'
import { UserBotDetailServerSettings } from './user-bot-detail-server-settings'

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
      <UiCard>
        <UiGroup>
          <Group>
            <UiDiscordServerItem server={item} />
          </Group>
        </UiGroup>
      </UiCard>
      <UiTabRoutes
        tabs={[
          {
            path: 'settings',
            label: 'Settings',
            element: <UserBotDetailServerSettings botId={bot.id} serverId={serverId} />,
          },
          { path: 'roles', label: 'Roles', element: <UserBotDetailServerRoles botId={bot.id} serverId={serverId} /> },
          {
            path: 'members',
            label: 'Members',
            element: <UserBotDetailServerMembers bot={bot} serverId={serverId} />,
          },
          {
            path: 'debug',
            label: 'Debug',
            element: (
              <UiStack>
                <UiDebug data={item} open hideButton />
                <Group justify="end">
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
                </Group>
              </UiStack>
            ),
          },
        ]}
      />
    </UiStack>
  )
}
