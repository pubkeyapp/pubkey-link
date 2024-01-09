import { Button, Group } from '@mantine/core'
import { useUserFindManyApp } from '@pubkey-link/web-app-data-access'
import { AppUiGrid } from '@pubkey-link/web-app-ui'
import { UiSearchField } from '@pubkey-link/web-ui-core'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function UserAppListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyApp()

  return (
    <UiPage
      title="Apps"
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
        <UiSearchField placeholder="Search app" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AppUiGrid
          apps={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No apps found" />
      )}
    </UiPage>
  )
}
