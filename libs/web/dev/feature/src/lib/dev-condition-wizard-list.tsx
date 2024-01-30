import { SimpleGrid } from '@mantine/core'
import { useAdminFindManyCommunity } from '@pubkey-link/web-community-data-access'
import { CommunityUiItem } from '@pubkey-link/web-community-ui'
import { UiCard, UiLoader, UiWarning } from '@pubkey-ui/core'

export function DevConditionWizardList() {
  const { items, query } = useAdminFindManyCommunity()

  return (
    <UiCard title="Select a community to create a condition">
      {query.isLoading ? (
        <UiLoader />
      ) : query.data ? (
        <SimpleGrid cols={{ base: 1, sm: 2, xl: 3 }} spacing="md">
          {items.map((item) => (
            <CommunityUiItem key={item.id} community={item} to={item.id} />
          ))}
        </SimpleGrid>
      ) : (
        <UiWarning title="No communities found" message="Please create a community first." />
      )}
    </UiCard>
  )
}
