import { Log } from '@pubkey-link/sdk'
import { Anchor, Group, ScrollArea } from '@mantine/core'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { UiDebugModal, UiTime } from '@pubkey-ui/core'
import { UserUiAvatarLoader } from '@pubkey-link/web-user-ui'
import { LogUiLevelBadge } from './user-log-ui-table'

export function UserLogUiTableSimple({ logs = [] }: { logs: Log[] }) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'level',
            width: '90px',
            textAlign: 'center',
            render: (item) => <LogUiLevelBadge level={item.level} />,
          },
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
            render: (item) => (item.userId ? <UserUiAvatarLoader userId={item.userId} size="sm" /> : null),
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
