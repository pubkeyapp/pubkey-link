import { Group } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindManyCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { UserCommunityMemberUiTable, UserCreateCommunityMemberModal } from '@pubkey-link/web-community-member-ui'
import { CommunityUiSelectRole } from '@pubkey-link/web-community-ui'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserCommunityMemberListFeature({ community }: { community: Community }) {
  const { createCommunityMember, deleteCommunityMember, items, pagination, query, setSearch, role, setRole } =
    useUserFindManyCommunityMember({
      communityId: community.id,
      limit: 20,
    })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search member" setSearch={setSearch} />
        <UiDebugModal data={items} />
        <UserCreateCommunityMemberModal create={createCommunityMember} />
        <CommunityUiSelectRole placeholder="Filter by Role" value={role} setValue={setRole} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserCommunityMemberUiTable
          refresh={query.refetch}
          deleteCommunityMember={(communityMember) => {
            if (!window.confirm('Are you sure?')) return
            return deleteCommunityMember(communityMember.id)
          }}
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
