import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-link/web-ui-core'
import { useAdminFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { AdminNetworkTokenUiTable } from '@pubkey-link/web-network-token-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { NetworkCluster } from '@pubkey-link/sdk'

export function AdminNetworkTokenListFeature({ cluster }: { cluster: NetworkCluster }) {
  const { deleteNetworkToken, items, pagination, query, setSearch } = useAdminFindManyNetworkToken({
    cluster,
    limit: 10,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search token" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminNetworkTokenUiTable
          deleteNetworkToken={(networkToken) => {
            if (!window.confirm('Are you sure?')) return
            return deleteNetworkToken(networkToken.id)
          }}
          networkTokens={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No tokens found." />
      )}
    </UiStack>
  )
}
