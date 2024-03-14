import { Anchor, Button, Group, Paper, Text } from '@mantine/core'
import { Community, UserCreateBotInput } from '@pubkey-link/sdk'
import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { BotUiItem, UserBotUiCreateForm } from '@pubkey-link/web-bot-ui'
import { toastError, UiCard, UiDebug, UiError, UiGroup, UiInfo, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { UserBotCommands } from './user-bot-commands'
import { UserBotDetailServerList } from './user-bot-detail-server-list'
import { UserBotDetailSettingsTab } from './user-bot-detail-settings.tab'

export function UserBotDetailFeature({ community }: { community: Community }) {
  const { item, query, deleteBot, createBot } = useUserFindOneBot({ communityId: community.id })

  async function submit(input: UserCreateBotInput) {
    return createBot(input)
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!item) {
    return (
      <UiCard title="Create Discord Bot">
        <UiStack>
          <Text span size="lg">
            Go to the{' '}
            <Anchor target="_blank" rel="noopener noreferrer" href="https://discord.com/developers/applications">
              Discord Developer Portal
            </Anchor>{' '}
            to create a new app or use an existing one and fill in the form below.
          </Text>

          <UiInfo message="Make sure to enable the 'SERVER MEMBERS INTENT' option in the bot section of your app." />

          <UserBotUiCreateForm submit={submit} />
        </UiStack>
      </UiCard>
    )
  }

  return (
    <UiStack>
      <Paper withBorder p="md" radius="sm">
        <UiGroup>
          <BotUiItem bot={item} />
          <Group>
            <UserBotCommands bot={item} />
          </Group>
        </UiGroup>
      </Paper>
      {item.started ? (
        <UiTabRoutes
          tabs={[
            {
              path: 'servers',
              label: 'Servers',
              element: <UserBotDetailServerList bot={item} />,
            },
            {
              path: 'settings',
              label: 'Bot Settings',
              element: (
                <UiStack>
                  <UserBotDetailSettingsTab bot={item} />
                  <UiError
                    variant="outline"
                    title="Danger zone"
                    message={
                      <UiStack align="end">
                        <Button variant="outline" color="red" onClick={() => deleteBot(item.id)}>
                          Delete Bot
                        </Button>
                      </UiStack>
                    }
                  />
                  <UiDebug data={item} />
                </UiStack>
              ),
            },
          ]}
        />
      ) : (
        <UiStack>
          <UiInfo message="Start the bot to access the settings." />
        </UiStack>
      )}
    </UiStack>
  )
}
