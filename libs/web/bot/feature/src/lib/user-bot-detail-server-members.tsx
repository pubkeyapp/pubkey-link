import { Group, Table, Text } from '@mantine/core'
import { Bot, IdentityProvider } from '@pubkey-link/sdk'
import { useUserGetBotMembers, useUserGetBotRoles } from '@pubkey-link/web-bot-data-access'
import { IdentityUiItemById } from '@pubkey-link/web-identity-ui'
import { UiDiscordRoleColor } from '@pubkey-link/web-ui-core'
import { UiAlert, UiCard, UiDebug, UiDebugModal, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserBotDetailServerMembers({ bot, serverId }: { bot: Bot; serverId: string }) {
  const { query: rolesQuery } = useUserGetBotRoles({ botId: bot.id, serverId })
  const query = useUserGetBotMembers({ botId: bot.id, serverId })

  if (query.isLoading || rolesQuery.isLoading) {
    return <UiLoader />
  }

  const roles = rolesQuery.data?.items ?? []
  const items = query.data?.items ?? []

  function ShowRole({ roleId }: { roleId: string }) {
    const role = roles.find((role) => role.id === roleId)
    if (!role) {
      return <Text c="danger">Role not found</Text>
    }
    return (
      <Text size="sm">
        <UiDiscordRoleColor color={role.color}>{role.name}</UiDiscordRoleColor>
      </Text>
    )
  }

  return (
    <UiStack>
      <UiCard p={0}>
        <UiStack>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{items.length} members</Table.Th>
                <Table.Th>Roles</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items?.length ? (
                items.map((item) => (
                  <Table.Tr key={item.memberId}>
                    <Table.Td>
                      <IdentityUiItemById provider={IdentityProvider.Discord} providerId={item.memberId} />
                    </Table.Td>
                    <Table.Td align="right">
                      <UiGroup>
                        <Group gap="xs" justify="end">
                          {item.roleIds?.length
                            ? item.roleIds.map((roleId) => <ShowRole roleId={roleId} key={roleId} />)
                            : null}
                        </Group>
                        <UiDebugModal data={item} />
                      </UiGroup>
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
