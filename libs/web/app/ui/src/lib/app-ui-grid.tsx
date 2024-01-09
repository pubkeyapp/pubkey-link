import { Pagination, SimpleGrid } from '@mantine/core'
import { App } from '@pubkey-link/sdk'
import { UiPageLimit } from '@pubkey-link/web-ui-core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { AppUiCard } from './app-ui-card'

export function AppUiGrid({
  apps = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  apps: App[]
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
        {apps.map((app) => (
          <AppUiCard key={app.id} to={app.id} app={app} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <UiPageLimit
          data={[
            { value: '3', label: '3' },
            { value: '6', label: '6' },
            { value: '9', label: '9' },
            { value: '12', label: '12' },
            { value: '15', label: '15' },
            { value: '18', label: '18' },
            { value: '21', label: '21' },
            { value: '24', label: '24' },
            { value: '99', label: '99' },
            { value: '999', label: '999' },
          ]}
          limit={limit}
          setLimit={setLimit}
          setPage={setPage}
        />
      </UiGroup>
    </UiStack>
  )
}
