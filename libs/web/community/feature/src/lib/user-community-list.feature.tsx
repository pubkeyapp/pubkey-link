import { Button, Group } from '@mantine/core'
import { useUserFindManyCommunity } from '@pubkey-link/web-community-data-access'
import { CommunityUiGrid } from '@pubkey-link/web-community-ui'
import { UiSearchField } from '@pubkey-link/web-ui-core'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function UserCommunityListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyCommunity({
    limit: 12,
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
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <CommunityUiGrid
          communities={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No communities found." />
      )}
    </UiPage>
  )
}
