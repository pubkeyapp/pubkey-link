import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useUserFindOneCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { useParams } from 'react-router-dom'
import { UserCommunityMemberDetailOverviewTab } from './user-community-member-detail-overview.tab'
import { UserCommunityMemberDetailSettingsTab } from './user-community-member-detail-settings.tab'

export function UserCommunityMemberDetailFeature() {
  const { communityMemberId } = useParams<{ communityMemberId: string }>() as { communityMemberId: string }
  const { item, query } = useUserFindOneCommunityMember({ communityMemberId })

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
            element: <UserCommunityMemberDetailOverviewTab communityMemberId={communityMemberId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <UserCommunityMemberDetailSettingsTab communityMemberId={communityMemberId} />,
          },
        ]}
      />
    </UiPage>
  )
}
