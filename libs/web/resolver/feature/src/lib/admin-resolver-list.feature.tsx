import { Button, Group } from '@mantine/core'
import { NetworkCluster } from '@pubkey-link/sdk'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-core-ui'
import { useAdminFindManyResolver } from '@pubkey-link/web-resolver-data-access'
import { AdminResolverUiTable } from '@pubkey-link/web-resolver-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminResolverListFeature({ cluster }: { cluster: NetworkCluster }) {
  const { deleteResolver, items, pagination, query, setSearch } = useAdminFindManyResolver({
    cluster,
    limit: 10,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search resolver" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminResolverUiTable
          deleteResolver={(resolver) => {
            if (!window.confirm('Are you sure?')) return
            return deleteResolver(resolver.id)
          }}
          resolvers={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No resolvers found" />
      )}
    </UiStack>
  )
}
