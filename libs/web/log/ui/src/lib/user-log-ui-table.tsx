import { Anchor, Badge, Group, ScrollArea } from '@mantine/core'
import { Log, LogLevel } from '@pubkey-link/sdk'
import { UiDebugModal, UiTime, useUiColorScheme } from '@pubkey-ui/core'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function UserLogUiTable({
  logs = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
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
              <Anchor component={Link} to={`./${item.id}`} size="sm" fw={500}>
                {item.message}
              </Anchor>
            ),
          },
          {
            width: '15%',
            accessor: 'createdAt',
            textAlign: 'right',
            title: 'Created',
            render: (item) => (item.createdAt ? <UiTime date={new Date(item.createdAt)} /> : null),
          },
          {
            accessor: 'level',
            width: '5%',
            textAlign: 'right',
            render: (item) => <LogUiLevelBadge level={item.level} />,
          },
          {
            width: '10%',
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <UiDebugModal disabled={!item.data} data={item.data} />
                <UiDebugModal data={item} />
              </Group>
            ),
          },
        ]}
        records={logs}
      />
    </ScrollArea>
  )
}

export const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  [LogLevel.Info]: 'cyan',
  [LogLevel.Error]: 'red',
  [LogLevel.Warning]: 'yellow',
}

export function LogUiLevelBadge({ level }: { level: LogLevel }) {
  const { colorScheme } = useUiColorScheme()
  return (
    <Badge color={LOG_LEVEL_COLORS[level]} variant={colorScheme === 'dark' ? 'light' : 'outline'}>
      {level}
    </Badge>
  )
}
