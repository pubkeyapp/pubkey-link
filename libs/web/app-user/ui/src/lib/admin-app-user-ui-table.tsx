import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { type AdminUpdateAppUserInput, AppUser } from '@pubkey-link/sdk'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { AdminAppUserUiUpdateForm } from './admin-app-user-ui-update-form'
import { AppUserUiRoleBadge } from './app-user-ui-role-badge'

export function AdminAppUserUiTable({
  deleteAppUser,
  updateAppUser,
  appUsers = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteAppUser: (appUserId: string) => void
  updateAppUser: (appUserId: string, input: AdminUpdateAppUserInput) => Promise<boolean>
  appUsers: AppUser[]
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
            accessor: 'user',
            render: (item) => <UserUiItem user={item.user} to={`/admin/users/${item.userId}`} />,
          },
          {
            accessor: 'role',
            render: (item) => (
              <Anchor component={Link} to={`/admin/apps/${item.appId}/users/${item.id}`} size="sm" fw={500}>
                <AppUserUiRoleBadge role={item.role} />
              </Anchor>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <AdminAppUserUiUpdateForm appUser={item} submit={async (input) => updateAppUser(item.id, input)} />
                <ActionIcon
                  color="red"
                  variant="light"
                  size="sm"
                  onClick={() => {
                    if (!window.confirm('Are you sure?')) return
                    deleteAppUser(item.id)
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={appUsers}
      />
    </ScrollArea>
  )
}
