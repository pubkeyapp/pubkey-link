import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { CommunityMember } from '@pubkey-link/sdk'
import { RoleUiItem } from '@pubkey-link/web-role-ui'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { UiDebugModal } from '@pubkey-ui/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { CommunityMemberUiRole } from './community-member-ui-role'

export function UserCommunityMemberUiTable({
  deleteCommunityMember,
  communityMembers = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteCommunityMember: (communityMember: CommunityMember) => void
  communityMembers: CommunityMember[]
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
            render: (item) => (item.user ? <UserUiItem user={item.user} to={item.user.profileUrl} /> : null),
          },
          {
            accessor: 'roles',
            render: (item) => (
              <Group gap="xs">
                {item.roles?.map((role) => (
                  <Anchor key={role.id} component={Link} to={`../roles/${role.id}`} size="sm" fw={500}>
                    <RoleUiItem avatarProps={{ size: 'sm' }} textProps={{ fz: 'sm' }} role={role} />
                  </Anchor>
                ))}
              </Group>
            ),
          },
          {
            accessor: 'role',
            render: (item) => (
              <Anchor component={Link} to={`./${item.id}`} size="sm" fw={500}>
                <CommunityMemberUiRole role={item.role} />
              </Anchor>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <UiDebugModal data={item} />
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteCommunityMember(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={communityMembers}
      />
    </ScrollArea>
  )
}
