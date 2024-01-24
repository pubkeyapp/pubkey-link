import { ActionIcon, Button, Group, Select, SimpleGrid, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Rule, UserCreateRulePermissionInput } from '@pubkey-link/sdk'
import { useUserFindOneBot, useUserGetBotRoles, useUserGetBotServers } from '@pubkey-link/web-bot-data-access'
import { useUserFindOneRule } from '@pubkey-link/web-rule-data-access'
import { UiDiscordServerItem } from '@pubkey-link/web-ui-core'
import { UiAnchor, UiCard, UiGroup, UiInfo, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { useMemo, useState } from 'react'

export function UserRuleDetailPermissionsTab({ rule }: { rule: Rule }) {
  const { deleteRulePermission } = useUserFindOneRule({ ruleId: rule.id })
  if (!rule.conditions?.length) {
    return <UiWarning message="Rule needs at least one condition." />
  }
  return (
    <UiStack>
      <UiInfo
        title="Rule Conditions"
        message={
          <Group justify="space-between">
            <Text size="sm" span>
              Permissions will be granted once these <UiAnchor to={'../conditions'}>conditions</UiAnchor> are met.
            </Text>
            <AddPermissionButton rule={rule} />
          </Group>
        }
      />

      {rule.permissions?.length ? (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {rule.permissions
            .sort((a, b) => (a.bot?.server?.name ?? '').localeCompare(b.bot?.server?.name ?? '') ?? 0)
            .map((permission) => (
              <UiCard key={permission.id}>
                <UiStack>
                  <UiGroup align="top">
                    <UiDiscordServerItem server={permission.bot?.server} role={permission.bot?.role} />
                    <ActionIcon
                      size="xs"
                      variant="light"
                      color="red"
                      onClick={() => {
                        if (!window.confirm('Are you sure?')) return
                        deleteRulePermission(permission.id)
                      }}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </UiGroup>
                  <Text size="sm" c="dimmed">
                    Get the <strong>{permission.bot?.role?.name}</strong> role in the{' '}
                    <strong>{permission.bot?.server?.name}</strong> Discord server.
                  </Text>
                </UiStack>
              </UiCard>
            ))}
        </SimpleGrid>
      ) : (
        <UiWarning message="No permissions found." />
      )}
    </UiStack>
  )
}

function AddPermissionButton({ rule }: { rule: Rule }) {
  const { query, item } = useUserFindOneBot()
  const { createRulePermission } = useUserFindOneRule({ ruleId: rule.id })

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
          children: <AddPermissionForm botId={item.id} rule={rule} create={createRulePermission} />,
        })
      }
    >
      Add Permission
    </Button>
  ) : (
    <UiWarning message="No bot configured." />
  )
}

function AddPermissionForm({
  rule,
  botId,
  create,
}: {
  rule: Rule
  botId: string
  create: (permission: UserCreateRulePermissionInput) => Promise<boolean>
}) {
  const [serverId, setServerId] = useState<string | null>(null)
  const [roleId, setRoleId] = useState<string | null>(null)
  return (
    <UiStack>
      <DiscordUiBotSelect botId={botId} value={serverId} setValue={setServerId} />
      {serverId && (
        <DiscordUiRoleSelect
          filter={rule.permissions?.filter((p) => p.bot?.serverId === serverId).map((p) => p.bot?.roleId ?? '') ?? []}
          botId={botId}
          serverId={serverId}
          value={roleId}
          setValue={setRoleId}
        />
      )}
      <Group justify="end">
        <Button
          disabled={!serverId || !roleId}
          onClick={() => {
            if (!serverId || !roleId) return
            return create({ botId, roleId, serverId, ruleId: rule.id })
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
  const query = useUserGetBotRoles({ botId, serverId })
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
