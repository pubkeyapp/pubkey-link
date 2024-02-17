import { ActionIcon, Badge, Group, ScrollArea } from '@mantine/core'
import { Role } from '@pubkey-link/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { RoleUiItem } from './role-ui-item'

export function UserRoleUiTable({
  deleteRole,
  roles = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteRole: (role: Role) => void
  roles: Role[]
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
            render: (item) => <RoleUiItem role={item} to={`./${item.id}`} />,
          },
          {
            textAlign: 'center',
            accessor: 'conditions',
            render: (item) => (
              <Badge variant="light" color={item?.conditions?.length ? 'brand' : 'yellow'}>
                {item.conditions?.length ?? 0}
              </Badge>
            ),
          },
          {
            textAlign: 'center',
            accessor: 'permissions',
            render: (item) => (
              <Badge variant="light" color={item?.permissions?.length ? 'brand' : 'yellow'}>
                {item.permissions?.length ?? 0}
              </Badge>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteRole(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={roles}
      />
    </ScrollArea>
  )
}
