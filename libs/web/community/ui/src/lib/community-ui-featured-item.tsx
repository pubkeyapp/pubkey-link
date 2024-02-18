import { Community } from '@pubkey-link/sdk'
import { UiGroup } from '@pubkey-ui/core'
import { CommunityUiSocials } from './community-ui-grid-item'
import { CommunityUiItem } from './community-ui-item'

export function CommunityUiFeaturedItem({ item }: { item: Community }) {
  return (
    <UiGroup>
      <CommunityUiItem community={item} />
      <CommunityUiSocials community={item} />
    </UiGroup>
  )
}
