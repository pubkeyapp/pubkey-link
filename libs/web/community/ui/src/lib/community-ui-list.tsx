import type { Community } from '@pubkey-link/sdk'
import { RoleUiList } from '@pubkey-link/web-role-ui'
import { UiDebugModal, UiGroup, UiInfo, UiStack } from '@pubkey-ui/core'
import { Button, Paper } from '@mantine/core'
import { CommunityUiItem } from './community-ui-item'
import { CommunityUiSocials } from './community-ui-socials'
import { useState } from 'react'

export function CommunityUiList({ communities }: { communities: Community[] }) {
  return communities.map((item) => <CommunityUiListItem key={item.id} item={item} to={`/c/${item.id}`} />)
}

export function CommunityUiListItem({ item, to }: { item: Community; to?: string }) {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <Paper withBorder p="md">
      <UiStack>
        <UiGroup>
          <CommunityUiItem community={item} to={to} />
          <UiStack align="end">
            <CommunityUiSocials community={item}>
              <UiDebugModal data={item} />
            </CommunityUiSocials>
            <Button
              disabled={!item?.roles?.length}
              variant="subtle"
              size="xs"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>
          </UiStack>
        </UiGroup>
        {item?.roles?.length ? (
          showDetails ? (
            <RoleUiList mt="xs" roles={item.roles ?? []} />
          ) : null
        ) : (
          <UiInfo message="No roles." />
        )}
      </UiStack>
    </Paper>
  )
}
