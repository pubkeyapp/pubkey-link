import { useRoutes } from 'react-router-dom'
import { AdminCommunityMemberDetailFeature } from './admin-community-member-detail.feature'
import { AdminCommunityMemberCreateFeature } from './admin-community-member-create.feature'
import { AdminCommunityMemberListFeature } from './admin-community-member-list.feature'

export default function AdminCommunityMemberRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <AdminCommunityMemberListFeature communityId={communityId} /> },
    {
      path: 'create',
      element: <AdminCommunityMemberCreateFeature communityId={communityId} />,
    },
    { path: ':communityMemberId/*', element: <AdminCommunityMemberDetailFeature /> },
  ])
}
