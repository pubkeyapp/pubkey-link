import { Button, Group, Table, Text } from '@mantine/core'
import { Bot } from '@pubkey-link/sdk'
import { useUserGetBotMembers, useUserManageBot } from '@pubkey-link/web-bot-data-access'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { UiAlert, UiCard, UiDebug, UiDebugModal, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserBotDetailServerMembers({ bot, serverId }: { bot: Bot; serverId: string }) {
  const { syncServer } = useUserManageBot({ bot })
  const query = useUserGetBotMembers({ botId: bot.id, serverId })

  if (query.isLoading) {
    return <UiLoader />
  }

  const items = query.data?.items ?? []

  return (
    <UiStack>
      <UiCard p={0}>
        <UiStack>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th align={'right'}>
                  <Group justify="end">
                    <Text c="dimmed" size="xs">
                      {items.length} members
                    </Text>
                    <Button
                      loading={query.isLoading}
                      size="xs"
                      color="brand"
                      variant="light"
                      onClick={() => syncServer(serverId).then(() => query.refetch())}
                    >
                      Sync Server
                    </Button>
                  </Group>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items?.length ? (
                items.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      {item.identity?.owner ? (
                        <UserUiItem user={item.identity.owner} to={item.identity.owner.profileUrl} />
                      ) : null}
                    </Table.Td>
                    <Table.Td align="right">
                      <UiDebugModal data={item} />
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={2}>
                    <UiAlert message="No members found." />
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </UiStack>
      </UiCard>
      <UiDebug data={items} />
    </UiStack>
  )
}
