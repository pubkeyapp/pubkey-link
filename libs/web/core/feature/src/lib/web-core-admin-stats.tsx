import { SimpleGrid } from '@mantine/core'
import { useAdminTableStats } from '@pubkey-link/web-core-data-access'
import { UiStatRecordTable } from '@pubkey-link/web-core-ui'
import { UiBack, UiPage } from '@pubkey-ui/core'

export default function WebCoreAdminStats() {
  const { isLoading, items } = useAdminTableStats()
  return (
    <UiPage title="Stats" leftAction={<UiBack />}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <UiStatRecordTable title="Table Stats" isLoading={isLoading} items={items} />
      </SimpleGrid>
    </UiPage>
  )
}
