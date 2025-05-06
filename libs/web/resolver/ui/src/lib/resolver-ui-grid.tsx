import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { Resolver } from '@pubkey-link/sdk'
import { gridLimits, UiPageLimit } from '@pubkey-link/web-core-ui'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { ResolverUiGridItem } from './resolver-ui-grid-item'

export function ResolverUiGrid({
  resolvers = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  resolvers: Resolver[]
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
        {resolvers.map((resolver) => (
          <ResolverUiGridItem key={resolver.id} to={resolver.id} resolver={resolver} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={resolvers} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
