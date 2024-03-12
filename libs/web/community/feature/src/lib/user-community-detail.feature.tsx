import { Badge, Group } from '@mantine/core'
import { UserBotFeature } from '@pubkey-link/web-bot-feature'
import { useUserFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { UserCommunityMemberFeature } from '@pubkey-link/web-community-member-feature'
import { CommunityUiItem } from '@pubkey-link/web-community-ui'
import { UiIcon } from '@pubkey-link/web-core-ui'
import { UserLogFeature } from '@pubkey-link/web-log-feature'
import { NetworkUiClusterBadge } from '@pubkey-link/web-network-ui'
import { UserRoleFeature } from '@pubkey-link/web-role-feature'
import { UserSnapshotFeature } from '@pubkey-link/web-snapshot-feature'
import { UserTeamFeature } from '@pubkey-link/web-team-feature'
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
import { IconBrandDiscord, IconUsersGroup } from '@tabler/icons-react'
import { lazy } from 'react'
import { useParams } from 'react-router-dom'

const RouteDashboard = lazy(() => import('./user-community-detail-dashboard.tab'))
const RouteSettings = lazy(() => import('./user-community-detail-settings.tab'))

export function UserCommunityDetailFeature() {
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, isLoading, communityAdmin, role } = useUserFindOneCommunity({ communityId })

  if (isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }
  if (!role) {
    return <UiError message="You are not a member." />
  }

  const routes: UiGridRoute[] = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      element: <RouteDashboard community={item} role={role} />,
      leftSection: <UiIcon type="dashboard" size={20} />,
    },
    {
      path: 'teams',
      label: 'Teams',
      element: <UserTeamFeature communityId={communityId} />,
      leftSection: <IconUsersGroup size={20} />,
    },
    communityAdmin && {
      path: 'discord',
      label: 'Discord',
      element: <UserBotFeature community={item} />,
      leftSection: <IconBrandDiscord size={20} />,
    },
    communityAdmin && {
      path: 'roles',
      label: 'Roles',
      element: <UserRoleFeature community={item} />,
      leftSection: <UiIcon type="roles" size={20} />,
    },
    communityAdmin && {
      path: 'members',
      label: 'Members',
      element: <UserCommunityMemberFeature community={item} />,
      leftSection: <UiIcon type="users" size={20} />,
    },
    communityAdmin && {
      label: 'Snapshots',
      path: 'snapshots',
      element: <UserSnapshotFeature communityId={item.id} />,
      leftSection: <UiIcon type="snapshot" size={20} />,
    },
    communityAdmin && {
      label: 'Logs',
      path: 'logs',
      element: <UserLogFeature communityId={item.id} />,
      leftSection: <UiIcon type="logs" size={20} />,
    },
    communityAdmin && {
      path: 'settings',
      label: 'Settings',
      element: <RouteSettings community={item} />,
      leftSection: <UiIcon type="settings" size={20} />,
    },
  ].filter(Boolean) as UiGridRoute[]

  return (
    <UiContainer>
      <UiStack gap="lg">
        <UiGroup>
          <Group>
            <UiBack />
            <CommunityUiItem
              community={item}
              title={
                <Badge variant="dot" color={item.enableSync ? 'lime' : 'orange'} size="xs">
                  Sync {item.enableSync ? 'Enabled' : 'Disabled'}
                </Badge>
              }
            />
          </Group>
          <Group>
            <UiDebugModal data={item} />
            <NetworkUiClusterBadge cluster={item.cluster} />
          </Group>
        </UiGroup>
        <UiGridRoutes basePath={`/c/${communityId}`} routes={routes} />
      </UiStack>
    </UiContainer>
  )
}
