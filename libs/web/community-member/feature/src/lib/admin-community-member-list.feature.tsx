import { Group } from '@mantine/core'
import { useAdminFindManyCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { AdminAddCommunityMemberModal, AdminCommunityMemberUiTable } from '@pubkey-link/web-community-member-ui'
import { CommunityUiSelectRole } from '@pubkey-link/web-community-ui'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminCommunityMemberListFeature({ communityId }: { communityId: string }) {
  const { addCommunityMember, removeCommunityMember, items, pagination, query, role, setRole, setSearch } =
    useAdminFindManyCommunityMember({
      communityId,
    })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search member" setSearch={setSearch} />
        <UiDebugModal data={items} />
        <AdminAddCommunityMemberModal create={addCommunityMember} />
        <CommunityUiSelectRole placeholder="Filter by Role" value={role} setValue={setRole} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminCommunityMemberUiTable
          deleteCommunityMember={(communityMember) => {
            if (!window.confirm('Are you sure?')) return
            return removeCommunityMember(communityMember.id)
          }}
          refresh={query.refetch}
          communityMembers={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No members found." />
      )}
    </UiStack>
  )
}
