import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { useAdminFindManyCommunity } from '@pubkey-link/web-community-data-access'
import { AdminCommunityUiTable } from '@pubkey-link/web-community-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminCommunityListFeature() {
  const { deleteCommunity, items, pagination, query, setSearch } = useAdminFindManyCommunity({
    limit: 10,
  })

  return (
    <UiPage
      title="Communities"
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
        <UiSearchField placeholder="Search community" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminCommunityUiTable
          deleteCommunity={(community) => {
            if (!window.confirm('Are you sure?')) return
            return deleteCommunity(community.id)
          }}
          communities={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No communities found." />
      )}
    </UiPage>
  )
}
