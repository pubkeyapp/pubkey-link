import { ActionIcon, Button, Group, Select, SimpleGrid, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Role, UserCreateRolePermissionInput } from '@pubkey-link/sdk'
import { useUserFindOneBot, useUserGetBotRoles, useUserGetBotServers } from '@pubkey-link/web-bot-data-access'
import { useUserFindOneRole } from '@pubkey-link/web-role-data-access'
import { UiDiscordServerItem } from '@pubkey-link/web-ui-core'
import { UiAnchor, UiCard, UiGroup, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { useMemo, useState } from 'react'

export function UserRoleDetailPermissionsTab({ role }: { role: Role }) {
  const { query, item } = useUserFindOneBot({ communityId: role.communityId })
  const { deleteRolePermission } = useUserFindOneRole({ roleId: role.id })
  if (!role.conditions?.length) {
    return <UiWarning message="Role needs at least one condition." />
  }
  return query.isLoading ? (
    <UiLoader />
  ) : item ? (
    <UiStack>
      <Text size="sm" span>
        Permissions will be granted once the above conditions are met.
      </Text>
      {role.permissions?.length ? (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {role.permissions
            .sort((a, b) => (a.botRole?.server?.name ?? '').localeCompare(b.botRole?.server?.name ?? '') ?? 0)
            .map((permission) => (
              <UiCard key={permission.id}>
                <UiStack>
                  <UiGroup align="top">
                    <UiDiscordServerItem server={permission.botRole?.server} role={permission.botRole?.serverRole} />
                    <ActionIcon
                      size="xs"
                      variant="light"
                      color="red"
                      onClick={() => {
                        if (!window.confirm('Are you sure?')) return
                        deleteRolePermission(permission.id)
                      }}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </UiGroup>
                  <Text size="sm" c="dimmed">
                    Get the <strong>{permission.botRole?.serverRole?.name}</strong> role in the{' '}
                    <strong>{permission.botRole?.server?.name}</strong> Discord server.
                  </Text>
                </UiStack>
              </UiCard>
            ))}
        </SimpleGrid>
      ) : (
        <UiWarning message="No permissions found." />
      )}
    </UiStack>
  ) : (
    <UiWarning
      title="No bot configured."
      message={
        <Text size="sm" span>
          In order to grant permissions, you need to configure a{' '}
          <UiAnchor to={`/c/${role.communityId}/discord`}>Discord bot</UiAnchor> for this community.
        </Text>
      }
    />
  )
}

export function AddPermissionButton({ role }: { role: Role }) {
  const { query, item } = useUserFindOneBot({ communityId: role.communityId })
  const { createRolePermission } = useUserFindOneRole({ roleId: role.id })

  return query.isLoading ? (
    <UiLoader size="sm" type="bars" />
  ) : item ? (
    <Button
      size="xs"
      variant="light"
      leftSection={<IconPlus size={28} />}
      onClick={() =>
        modals.open({
          title: 'Add Permission',
          children: (
            <AddPermissionForm
              botId={item.id}
              role={role}
              create={(input) =>
                createRolePermission(input).then((res) => {
                  modals.closeAll()
                  return res
                })
              }
            />
          ),
        })
      }
    >
      Add Permission
    </Button>
  ) : (
    <UiWarning message="No bot configured." />
  )
}

export function AddPermissionForm({
  role,
  botId,
  create,
}: {
  role: Role
  botId: string
  create: (permission: UserCreateRolePermissionInput) => Promise<boolean>
}) {
  const [serverId, setServerId] = useState<string | null>(null)
  const [serverRoleId, setServerRoleId] = useState<string | null>(null)
  return (
    <UiStack>
      <DiscordUiBotSelect botId={botId} value={serverId} setValue={setServerId} />
      {serverId && (
        <DiscordUiRoleSelect
          filter={
            role.permissions
              ?.filter((p) => p.botRole?.serverId === serverId)
              .map((p) => p.botRole?.serverRoleId ?? '') ?? []
          }
          botId={botId}
          serverId={serverId}
          value={serverRoleId}
          setValue={setServerRoleId}
        />
      )}
      <Group justify="end">
        <Button
          disabled={!serverId || !serverRoleId}
          onClick={() => {
            if (!serverId || !serverRoleId) return
            return create({ botId, roleId: role.id, serverId, serverRoleId: serverRoleId })
          }}
        >
          Create
        </Button>
      </Group>
    </UiStack>
  )
}

function DiscordUiBotSelect({
  botId,
  value,
  setValue,
}: {
  botId: string
  value: string | null
  setValue: (value: string | null) => void
}) {
  const query = useUserGetBotServers({ botId })
  const options = useMemo(() => {
    return query.data?.items?.map((server) => ({
      value: server.id,
      label: server.name,
    }))
  }, [query.data])

  return query.isLoading ? (
    <UiLoader size="sm" type="bars" />
  ) : query.data?.items?.length ? (
    <Select value={value} onChange={(event) => setValue(event)} label="Select Discord server" data={options} />
  ) : (
    <UiWarning message="No Discord servers found." />
  )
}

function DiscordUiRoleSelect({
  botId,
  serverId,
  value,
  setValue,
  filter = [],
}: {
  botId: string
  serverId: string
  filter: string[]
  value: string | null
  setValue: (value: string | null) => void
}) {
  const { query } = useUserGetBotRoles({ botId, serverId })
  const options = useMemo(() => {
    return query.data?.items?.map((role) => ({
      value: role.id,
      label: role.name,
      disabled: filter.includes(role.id),
    }))
  }, [query.data])

  return query.isLoading ? (
    <UiLoader size="sm" type="bars" />
  ) : query.data?.items?.length ? (
    <Select value={value} onChange={(event) => setValue(event)} label="Select Discord role" data={options} />
  ) : (
    <UiWarning message="No Discord roles found." />
  )
}
