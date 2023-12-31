import { Button, Group } from '@mantine/core'
import { useAdminFindOneDiscordServer } from '@pubkey-link/web/discord/data-access'
import { DiscordUiServerAvatar, DiscordUiServerTitle } from '@pubkey-link/web/discord/ui'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { UiAdminPage, UiAlert, UiBack, UiDebugModal, UiLoader, UiTabRoutes } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useNavigate, useParams } from 'react-router-dom'
import { DiscordServerDetailTabConditions } from './discord-server-detail-tab-conditions'
import { DiscordServerDetailTabRoles } from './discord-server-detail-tab-roles'
import { DiscordServerDetailTabSettings } from './discord-server-detail-tab-settings'

export function WebAdminDiscordServerDetailFeature() {
  const navigate = useNavigate()
  const { serverId } = useParams() as { serverId: string }

  const { query } = useAdminFindOneDiscordServer({ serverId })
  const sdk = useWebSdk()

  const server = query.data?.item

  if (query.isLoading) {
    return <UiLoader />
  }

  return (
    <UiAdminPage
      title={
        server?.name ? (
          <Group align="center">
            <DiscordUiServerAvatar item={server} size="md" />
            <DiscordUiServerTitle item={server} />
          </Group>
        ) : (
          '...'
        )
      }
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={server} />
          <Button
            disabled={server?.enabled}
            onClick={() =>
              sdk
                .adminDeleteDiscordServer({ serverId: server?.id as string })
                .then((res) => {
                  if (res) {
                    navigate('/admin/discord-servers')
                  }
                  showNotificationSuccess('Server deleted')
                  return true
                })
                .catch((err) => {
                  console.error(err)
                  showNotificationError('An error occurred')
                  return false
                })
            }
          >
            Delete Server
          </Button>
          <Button
            disabled={!server?.botChannel}
            onClick={() =>
              sdk
                .adminTestDiscordServerBotChannel({ serverId: server?.id as string })
                .then(() => {
                  showNotificationSuccess('Test sent')
                  return true
                })
                .catch((err) => {
                  console.error(err)
                  showNotificationError('An error occurred')
                  return false
                })
            }
          >
            Test Bot Channel
          </Button>
        </Group>
      }
    >
      {server?.enabled ? (
        <UiTabRoutes
          tabs={[
            {
              value: 'conditions',
              label: 'Conditions',
              component: server ? <DiscordServerDetailTabConditions server={server} /> : <UiLoader />,
            },
            {
              value: 'roles',
              label: 'Discord Roles',
              component: server ? <DiscordServerDetailTabRoles server={server} /> : <UiLoader />,
            },
            {
              value: 'settings',
              label: 'Settings',
              component: server ? (
                <DiscordServerDetailTabSettings server={server} refresh={() => query.refetch()} />
              ) : (
                <UiLoader />
              ),
            },
          ]}
        />
      ) : (
        <UiAlert
          variant="outline"
          color="yellow"
          message="This server is not enabled. You can enable it by inviting the bot to your server."
        />
      )}
    </UiAdminPage>
  )
}
