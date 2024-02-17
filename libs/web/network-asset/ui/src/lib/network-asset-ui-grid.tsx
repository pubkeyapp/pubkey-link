import { Group, Pagination, SimpleGrid } from '@mantine/core'
import type { NetworkAsset } from '@pubkey-link/sdk'
import { gridLimits, UiPageLimit } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { NetworkAssetUiGridItem } from './network-asset-ui-grid-item'

export function NetworkAssetUiGrid({
  networkAssets = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  networkAssets: NetworkAsset[]
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
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        {networkAssets.map((networkAsset) => (
          <NetworkAssetUiGridItem
            key={networkAsset.id}
            to={`/assets/${networkAsset.cluster}/${networkAsset.account}`}
            networkAsset={networkAsset}
          />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={networkAssets} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
