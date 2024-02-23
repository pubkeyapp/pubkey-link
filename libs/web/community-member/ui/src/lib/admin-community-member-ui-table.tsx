import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { modals } from '@mantine/modals'
import { CommunityMember } from '@pubkey-link/sdk'
import { useAdminFindOneCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { AdminCommunityMemberUiUpdateForm } from './admin-community-member-ui-update-form'
import { CommunityMemberUiRole } from './community-member-ui-role'

export function AdminCommunityMemberUiTable({
  deleteCommunityMember,
  communityMembers = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
  refresh,
}: {
  deleteCommunityMember: (communityMember: CommunityMember) => void
  communityMembers: CommunityMember[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
  refresh: () => void
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
            accessor: 'role',
            render: (item) => <CommunityMemberUiRole role={item.role} />,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon
                  color="brand"
                  variant="light"
                  size="sm"
                  onClick={() =>
                    modals.open({
                      centered: true,
                      title: `Edit ${item.user?.username}`,
                      children: <AdminCommunityMemberUiUpdateModal item={item} refresh={refresh} />,
                    })
                  }
                >
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

function AdminCommunityMemberUiUpdateModal({ item, refresh }: { item: CommunityMember; refresh: () => void }) {
  const { updateCommunityMember } = useAdminFindOneCommunityMember({ communityMemberId: item.id })

  return (
    <AdminCommunityMemberUiUpdateForm
      communityMember={item}
      submit={(value) =>
        updateCommunityMember(value).then((res) => {
          refresh()
          modals.closeAll()
          return res
        })
      }
    />
  )
}
