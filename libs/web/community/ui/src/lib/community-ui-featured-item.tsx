import { Community } from '@pubkey-link/sdk'
import { UiGroup } from '@pubkey-ui/core'
import { CommunityUiItem } from './community-ui-item'
import { CommunityUiSocials } from './community-ui-socials'

export function CommunityUiFeaturedItem({ item }: { item: Community }) {
  return (
    <UiGroup>
      <CommunityUiItem community={item} />
      <CommunityUiSocials community={item} />
    </UiGroup>
  )
}
