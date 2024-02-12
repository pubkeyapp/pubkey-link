import { ActionIcon, Anchor, Box, Group, ScrollArea, Tooltip } from '@mantine/core'
import { getEnumOptions, Log, LogLevel } from '@pubkey-link/sdk'
import { UiSelectEnumOption } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiTime } from '@pubkey-ui/core'
import { IconTrash, IconUser, IconUsers } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { LogUiLevelBadge } from './user-log-ui-table'

export function AdminLogUiTable({
  deleteLog,
  logs = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteLog: (log: Log) => void
  logs: Log[]
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
            accessor: 'message',
            render: (item) => (
              <Anchor component={Link} to={`./${item.id}`} fz="xs">
                {item.message}
              </Anchor>
            ),
          },
          {
            width: '15%',
            accessor: 'createdAt',
            textAlign: 'right',
            title: 'Created',
            render: (item) => (item.createdAt ? <UiTime fz="xs" date={new Date(item.createdAt)} /> : null),
          },
          {
            accessor: 'level',
            width: '0%',
            title: <Box>Level</Box>,
            textAlign: 'center',
            render: (item) => <LogUiLevelBadge level={item.level} />,
          },
          {
            width: '0%',
            accessor: 'actions',
            title: <Box mr={6}>Actions</Box>,
            textAlign: 'right',
            render: (item) => (
              <Group gap={4} wrap="nowrap">
                <Tooltip label={item.communityId ? `View Community Logs` : 'No Community ID'} position="left" withArrow>
                  <ActionIcon
                    disabled={!item.communityId}
                    component={Link}
                    to={`/admin/communities/${item.communityId}/logs`}
                    variant="light"
                    size="sm"
                  >
                    <IconUsers size={16} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip
                  label={item.userId ? `View ${item.user?.username ?? 'User'} Logs` : 'No User ID'}
                  position="left"
                  withArrow
                >
                  <ActionIcon
                    disabled={!item.userId}
                    component={Link}
                    to={`/admin/users/${item.userId}/logs`}
                    variant="light"
                    size="sm"
                  >
                    <IconUser size={16} />
                  </ActionIcon>
                </Tooltip>
                <UiDebugModal disabled={!item.data} data={item.data} />
                <UiDebugModal data={item} />
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteLog(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={logs}
      />
    </ScrollArea>
  )
}

export function AdminLogUiSelectLevel({
  value,
  setValue,
}: {
  value: LogLevel | undefined
  setValue: (value: LogLevel | undefined) => void
}) {
  return (
    <UiSelectEnumOption<LogLevel>
      value={value}
      setValue={setValue}
      options={[{ value: '', label: 'Filter by level' }, ...getEnumOptions(LogLevel)]}
    />
  )
}
