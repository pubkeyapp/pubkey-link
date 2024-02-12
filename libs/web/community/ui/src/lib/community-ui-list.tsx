import type { Community } from '@pubkey-link/sdk'
import { RoleUiList } from '@pubkey-link/web-role-ui'
import { UiInfo } from '@pubkey-ui/core'
import { CommunityUiGridItem } from './community-ui-grid-item'

export function CommunityUiList({ communities }: { communities: Community[] }) {
  return communities.map((item) => (
    <CommunityUiGridItem key={item.id} community={item}>
      {item?.roles?.length ? <RoleUiList mt="xs" roles={item.roles ?? []} /> : <UiInfo message="No roles." />}
    </CommunityUiGridItem>
  ))
}
