import { ActionIcon, Anchor, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import { IdentityUiAvatarGroup } from '@pubkey-link/web-identity-ui'
import { UiGroup } from '@pubkey-ui/core'
import { IconPencil, IconTrash, IconUser } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { UserUiAvatar } from './user-ui-avatar'
import { UserUiRoleBadge } from './user-ui-role-badge'
import { UserUiStatusBadge } from './user-ui-status-badge'

interface AdminUserTableProps {
  users: User[]
  deleteUser: (user: User) => void
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
}

export function AdminUserUiTable({
  deleteUser,
  users = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: AdminUserTableProps) {
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
            accessor: 'username',
            render: (item) => {
              const link = `/admin/users/${item.id}`
              return (
                <Group gap="sm" p={4}>
                  <UserUiAvatar size={40} user={item} radius={50} />
                  <Stack gap={1}>
                    <UiGroup justify="left" gap={4} align="baseline">
                      <Anchor component={Link} to={link} size="sm" fw={500}>
                        {item.username}
                      </Anchor>
                    </UiGroup>
                    {item.name ? (
                      <Text component={Link} to={link} size="sm" color="dimmed">
                        {item.name}
                      </Text>
                    ) : null}
                  </Stack>
                </Group>
              )
            },
          },
          {
            accessor: 'identities',
            textAlign: 'right',
            width: '20%',
            render: (item) => (
              <Group justify="right">
                <IdentityUiAvatarGroup identities={item.identities ?? []} />
              </Group>
            ),
          },
          {
            accessor: 'role',
            textAlign: 'center',
            width: '10%',
            render: (item) => (item.role ? <UserUiRoleBadge role={item.role} /> : null),
          },
          {
            accessor: 'status',
            textAlign: 'center',
            width: '10%',
            render: (item) => (item.status ? <UserUiStatusBadge status={item.status} /> : null),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            width: '10%',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon size="sm" variant="light" color="brand" component={Link} to={`/profile/${item.username}`}>
                  <IconUser size={16} />
                </ActionIcon>
                <ActionIcon
                  size="sm"
                  variant="light"
                  color="brand"
                  component={Link}
                  to={`/admin/users/${item.id}/settings`}
                >
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon size="sm" variant="light" color="red" onClick={() => deleteUser(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={users}
      />
    </ScrollArea>
  )
}
