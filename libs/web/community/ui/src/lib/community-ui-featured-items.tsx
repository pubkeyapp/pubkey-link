import { Box, Divider } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { CommunityUiFeaturedItem } from './community-ui-featured-item'

export function CommunityUiFeaturedItems({ items, label }: { items: Community[]; label: string }) {
  return (
    <Box mb="lg">
      {items?.length > 1 ? (
        <UiStack gap="xl">
          <Divider label={label} labelPosition="center" mt="lg" />
          {items.map((item) => (
            <CommunityUiFeaturedItem key={item.id} item={item} />
          ))}
        </UiStack>
      ) : (
        <CommunityUiFeaturedItem item={items[0]} />
      )}
    </Box>
  )
}
