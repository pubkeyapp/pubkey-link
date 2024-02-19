import { Paper } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { CommunityUiItem } from './community-ui-item'
import { CommunityUiSocials } from './community-ui-socials'

export function CommunityUiGridItem({
  children,
  community,
  to,
}: {
  children?: ReactNode
  community: Community
  to?: string
}) {
  return (
    <Paper withBorder p="md">
      <UiStack>
        <UiGroup>
          <CommunityUiItem community={community} to={to} />
          <CommunityUiSocials community={community}>
            <UiDebugModal data={community} />
          </CommunityUiSocials>
        </UiGroup>
        {children}
      </UiStack>
    </Paper>
  )
}
