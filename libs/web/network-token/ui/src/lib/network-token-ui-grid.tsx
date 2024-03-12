import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { NetworkToken } from '@pubkey-link/sdk'
import { gridLimits, UiPageLimit } from '@pubkey-link/web-core-ui'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { NetworkTokenUiGridItem } from './network-token-ui-grid-item'

export function NetworkTokenUiGrid({
  networkTokens = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  networkTokens: NetworkToken[]
  page: DataTableProps['page']
  totalRecords: number
  onPageChange: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  const totalPages = totalRecords / limit + 1
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {networkTokens.map((networkToken) => (
          <NetworkTokenUiGridItem key={networkToken.id} to={networkToken.id} networkToken={networkToken} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={networkTokens} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
