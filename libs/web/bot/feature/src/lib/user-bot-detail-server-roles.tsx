import { Table, Text } from '@mantine/core'
import { useUserGetBotRoles } from '@pubkey-link/web-bot-data-access'
import { UiDiscordRoleColor } from '@pubkey-link/web-ui-core'
import { UiAlert, UiCard, UiDebug, UiDebugModal, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserBotDetailServerRoles({ botId, serverId }: { botId: string; serverId: string }) {
  const query = useUserGetBotRoles({ botId, serverId })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.items?.length) {
    return <UiAlert message="No roles found." />
  }

  const items = query.data.items

  return (
    <UiStack>
      <UiCard p={0}>
        <UiStack>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th align="right">Managed</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <Text size="xl">
                      <UiDiscordRoleColor color={item.color}>{item.name}</UiDiscordRoleColor>
                    </Text>
                  </Table.Td>
                  <Table.Td align="right">
                    <UiDebugModal data={item} />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </UiStack>
      </UiCard>
      <UiDebug data={items} />
    </UiStack>
  )
}
