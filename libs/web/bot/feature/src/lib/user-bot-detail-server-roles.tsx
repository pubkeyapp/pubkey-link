import { Switch, Table, Text } from '@mantine/core'
import { useUserGetBotRoles } from '@pubkey-link/web-bot-data-access'
import { DiscordUiRoleColor } from '@pubkey-link/web-bot-ui'
import { UiAlert, UiCard, UiDebug, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserBotDetailServerRoles({ botId, serverId }: { botId: string; serverId: string }) {
  const query = useUserGetBotRoles({ botId, serverId })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.items?.length) {
    return <UiAlert message="Not roles found." />
  }

  const items = query.data.items

  return (
    <UiStack>
      <UiCard p={0}>
        <UiStack>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th align="right">Managed</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Text size="xl">
                      <DiscordUiRoleColor color={item.color}>{item.name}</DiscordUiRoleColor>
                    </Text>
                  </td>
                  <td align="right">
                    <Switch size="xl" checked={item.managed} onLabel="Yes" offLabel="No" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </UiStack>
      </UiCard>
      <UiDebug data={items} />
    </UiStack>
  )
}
