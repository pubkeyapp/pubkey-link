import { Group } from '@mantine/core'
import { AdminBotFeature } from '@pubkey-link/web-bot-feature'
import { useAdminFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { AdminCommunityMemberFeature } from '@pubkey-link/web-community-member-feature'
import { AdminLogFeature } from '@pubkey-link/web-log-feature'
import { AdminRuleFeature } from '@pubkey-link/web-rule-feature'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminCommunityDetailOverviewTab } from './admin-community-detail-overview.tab'
import { AdminCommunityDetailSettingsTab } from './admin-community-detail-settings.tab'

export function AdminCommunityDetailFeature() {
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, query } = useAdminFindOneCommunity({ communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <UiPage
      title={<Group>{item.name}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'overview',
            label: 'Overview',
            element: <AdminCommunityDetailOverviewTab communityId={communityId} />,
          },
          {
            path: 'rules',
            label: 'Rules',
            element: <AdminRuleFeature communityId={communityId} />,
          },
          { path: 'logs', label: 'Logs', element: <AdminLogFeature communityId={communityId} /> },
          { path: 'bots', label: 'Bots', element: <AdminBotFeature communityId={communityId} /> },
          {
            path: 'members',
            label: 'Members',
            element: <AdminCommunityMemberFeature communityId={communityId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminCommunityDetailSettingsTab communityId={communityId} />,
          },
        ]}
      />
    </UiPage>
  )
}
