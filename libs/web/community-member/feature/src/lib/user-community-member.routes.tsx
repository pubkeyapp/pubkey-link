import { useRoutes } from 'react-router-dom'
import { UserCommunityMemberDetailFeature } from './user-community-member-detail.feature'
import { UserCommunityMemberCreateFeature } from './user-community-member-create.feature'
import { UserCommunityMemberListFeature } from './user-community-member-list.feature'

export default function UserCommunityMemberRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <UserCommunityMemberListFeature communityId={communityId} /> },
    {
      path: 'create',
      element: <UserCommunityMemberCreateFeature communityId={communityId} />,
    },
    { path: ':communityMemberId/*', element: <UserCommunityMemberDetailFeature /> },
  ])
}
