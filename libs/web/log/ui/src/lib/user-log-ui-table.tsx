import { Anchor, Badge, Group, ScrollArea } from '@mantine/core'
import { Log, LogLevel } from '@pubkey-link/sdk'
import { BotUiAvatar } from '@pubkey-link/web-bot-ui'
import { UserUiAvatarLoader } from '@pubkey-link/web-user-ui'
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
              <Anchor component={Link} to={`./${item.id}`} size="xs">
                {item.message}
              </Anchor>
            ),
          },
          {
            width: '150px',
            accessor: 'createdAt',
            textAlign: 'right',
            title: 'Created',
            render: (item) => (
              <Group justify="end">{item.createdAt ? <UiTime date={new Date(item.createdAt)} /> : null}</Group>
            ),
          },
          {
            accessor: 'user',
            width: '60px',
            title: 'User',
            render: (item) => <UserUiAvatarLoader userId={item.userId} size="sm" />,
          },
          {
            accessor: 'bot',
            width: '60px',
            title: 'Bot',
            render: (item) =>
              item?.bot ? <BotUiAvatar bot={item.bot} size="sm" to={`/c/${item.communityId}/discord`} /> : null,
          },
          {
            accessor: 'level',
            width: '75px',
            textAlign: 'right',
            render: (item) => <LogUiLevelBadge level={item.level} />,
          },
          {
            width: '75px',
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
