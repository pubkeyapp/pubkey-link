import { Group, Pagination, SimpleGrid } from '@mantine/core'
import type { Snapshot } from '@pubkey-link/sdk'
import { gridLimits, UiPageLimit } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { SnapshotUiGridItem } from './snapshot-ui-grid-item'

export function SnapshotUiGrid({
  snapshots = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  snapshots: Snapshot[]
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
        {snapshots.map((snapshot) => (
          <SnapshotUiGridItem key={snapshot.id} to={snapshot.id} snapshot={snapshot} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={snapshots} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
