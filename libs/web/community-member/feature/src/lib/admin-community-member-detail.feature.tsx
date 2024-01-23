import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOneCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { useParams } from 'react-router-dom'
import { AdminCommunityMemberDetailOverviewTab } from './admin-community-member-detail-overview.tab'
import { AdminCommunityMemberDetailSettingsTab } from './admin-community-member-detail-settings.tab'

export function AdminCommunityMemberDetailFeature() {
  const { communityMemberId } = useParams<{ communityMemberId: string }>() as { communityMemberId: string }
  const { item, query } = useAdminFindOneCommunityMember({ communityMemberId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="CommunityMember not found." />
  }

  return (
    <UiPage
      title={<Group>{item.role}</Group>}
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
            element: <AdminCommunityMemberDetailOverviewTab communityMemberId={communityMemberId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminCommunityMemberDetailSettingsTab communityMemberId={communityMemberId} />,
          },
        ]}
      />
    </UiPage>
  )
}
