import { useAnonGetCommunities } from '@pubkey-link/web-community-data-access'
import { UiLoader } from '@pubkey-ui/core'
import { CommunityUiFeaturedItems } from './community-ui-featured-items'

export function CommunityUiFeatured() {
  const { query, items } = useAnonGetCommunities()

  return query.isLoading ? <UiLoader my="xl" /> : items.length ? <CommunityUiFeaturedItems items={items} /> : null
}
