import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { Allocation } from '@pubkey-link/sdk'
import { gridLimits, UiPageLimit } from '@pubkey-link/web-core-ui'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { AllocationUiGridItem } from './allocation-ui-grid-item'

export function AllocationUiGrid({
  allocations = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  allocations: Allocation[]
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
        {allocations.map((allocation) => (
          <AllocationUiGridItem key={allocation.id} to={allocation.id} allocation={allocation} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={allocations} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
