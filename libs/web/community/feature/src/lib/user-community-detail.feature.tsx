import { Badge, Group } from '@mantine/core'
import { UserBotFeature } from '@pubkey-link/web-bot-feature'
import { useUserFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { UserCommunityMemberFeature } from '@pubkey-link/web-community-member-feature'
import { CommunityUiItem } from '@pubkey-link/web-community-ui'
import { UserRuleFeature } from '@pubkey-link/web-rule-feature'
import { UiIcon } from '@pubkey-link/web-ui-core'
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
import { IconBrandDiscord } from '@tabler/icons-react'
import { lazy } from 'react'
import { useParams } from 'react-router-dom'

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
      element: <RouteDashboard community={item} />,
      leftSection: <UiIcon type="dashboard" size={20} />,
    },
    {
      path: 'discord',
      label: 'Discord',
      element: <UserBotFeature community={item} />,
      leftSection: <IconBrandDiscord size={20} />,
    },
    {
      path: 'rules',
      label: 'Rules',
      element: <UserRuleFeature community={item} />,
      leftSection: <UiIcon type="rules" size={20} />,
    },
    {
      path: 'members',
      label: 'Members',
      element: <UserCommunityMemberFeature community={item} />,
      leftSection: <UiIcon type="users" size={20} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <RouteSettings community={item} />,
      leftSection: <UiIcon type="settings" size={20} />,
    },
  ]

  return (
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
  )
}
