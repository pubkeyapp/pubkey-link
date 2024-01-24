import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { Bot, BotPermission } from '@pubkey-link/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { UiStack } from '@pubkey-ui/core'
import { RuleUiItem } from '@pubkey-link/web-rule-ui'
import { UiDiscordServerItem } from '@pubkey-link/web-ui-core'

export function UserBotUiTable({
  deleteBot,
  bots = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteBot: (bot: Bot) => void
  bots: Bot[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        onPageChange={onPageChange}
        page={page ?? 1}
        recordsPerPage={recordsPerPage ?? 10}
        totalRecords={totalRecords ?? 1}
        columns={[
          {
            accessor: 'name',
            render: (item) => (
              <Anchor component={Link} to={`/bots/${item.id}`} size="sm" fw={500}>
                {item.name}
              </Anchor>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`/bots/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteBot(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={bots}
      />
    </ScrollArea>
  )
}

export function UserBotPermissionUiTable({
  deleteBotPermission,
  permissions = [],
}: {
  deleteBotPermission: (bot: BotPermission) => void
  permissions: BotPermission[]
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'name',
            title: 'Server and Role',
            render: (item) => <UiDiscordServerItem server={item?.server} role={item?.role} />,
          },
          {
            accessor: 'rule',
            title: 'Rule',
            render: (item) =>
              item?.rules?.length ? (
                <UiStack>
                  {item?.rules?.map((rule) => (
                    <RuleUiItem key={rule.id} rule={rule} to={rule.viewUrl} />
                  ))}
                </UiStack>
              ) : null,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteBotPermission(item)}>
                <IconTrash size={16} />
              </ActionIcon>
            ),
          },
        ]}
        records={permissions}
      />
    </ScrollArea>
  )
}
