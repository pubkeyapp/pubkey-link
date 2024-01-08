import { Button, Group } from '@mantine/core'
import { useAdminFindManyApp } from '@pubkey-link/web-app-data-access'
import { AdminAppUiTable } from '@pubkey-link/web-app-ui'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminAppListFeature() {
  const { deleteApp, items, pagination, query, setSearch } = useAdminFindManyApp()

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
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminAppUiTable
          deleteApp={(app) => {
            if (!window.confirm('Are you sure?')) return
            return deleteApp(app.id)
          }}
          apps={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No apps found" />
      )}
    </UiPage>
  )
}
