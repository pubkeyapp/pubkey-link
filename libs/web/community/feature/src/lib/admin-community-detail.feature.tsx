import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { useParams } from 'react-router-dom'
import { AdminCommunityDetailOverviewTab } from './admin-community-detail-overview.tab'
import { AdminCommunityDetailSettingsTab } from './admin-community-detail-settings.tab'
import { AdminCommunityMemberFeature } from '@pubkey-link/web-community-member-feature'

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
            path: 'members',
            label: 'Members',
            element: <AdminCommunityMemberFeature communityId={communityId} />,
          },

          {
            path: 'overview',
            label: 'Overview',
            element: <AdminCommunityDetailOverviewTab communityId={communityId} />,
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
