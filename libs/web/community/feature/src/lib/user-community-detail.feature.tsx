import { Badge, Group } from '@mantine/core'
import {
  UiBack,
  UiContainer,
  UiDebugModal,
  UiError,
  type UiGridRoute,
  UiGridRoutes,
  UiGroup,
  UiLoader,
  UiStack,
} from '@pubkey-ui/core'
import { UserCommunityProvider, useUserFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { useParams } from 'react-router-dom'
import { lazy } from 'react'
import { UiIcon } from '@pubkey-link/web-ui-core'
import { CommunityUiItem } from '@pubkey-link/web-community-ui'
import { UserCommunityMemberFeature } from '@pubkey-link/web-community-member-feature'
import { UserRuleFeature } from '@pubkey-link/web-rule-feature'

const RouteDashboard = lazy(() => import('./user-community-detail-dashboard.tab'))
const RouteSettings = lazy(() => import('./user-community-detail-settings.tab'))

export function UserCommunityDetailFeature() {
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, query } = useUserFindOneCommunity({ communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  const routes: UiGridRoute[] = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      element: <RouteDashboard />,
      leftSection: <UiIcon type="dashboard" size={20} />,
    },
    {
      path: 'rules',
      label: 'Rules',
      element: <UserRuleFeature />,
      leftSection: <UiIcon type="rules" size={20} />,
    },
    {
      path: 'members',
      label: 'Members',
      element: <UserCommunityMemberFeature />,
      leftSection: <UiIcon type="users" size={20} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <RouteSettings />,
      leftSection: <UiIcon type="settings" size={20} />,
    },
  ]

  return (
    <UserCommunityProvider community={item}>
      <UiContainer>
        <UiStack gap="lg">
          <UiGroup>
            <Group>
              <UiBack />
              <CommunityUiItem community={item} />
            </Group>
            <Group>
              <UiDebugModal data={item} />
              <Badge variant="light" radius="sm">
                {item.cluster}
              </Badge>
            </Group>
          </UiGroup>
          <UiGridRoutes basePath={`/c/${communityId}`} routes={routes} />
        </UiStack>
      </UiContainer>
    </UserCommunityProvider>
  )
}
