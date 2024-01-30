import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { useAdminFindManyCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { AdminCommunityMemberUiTable } from '@pubkey-link/web-community-member-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminCommunityMemberListFeature({ communityId }: { communityId: string }) {
  const { deleteCommunityMember, items, pagination, query, setSearch } = useAdminFindManyCommunityMember({
    communityId,
  })

  return (
    <UiPage
      title="CommunityMembers"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search member" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminCommunityMemberUiTable
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
    </UiPage>
  )
}
