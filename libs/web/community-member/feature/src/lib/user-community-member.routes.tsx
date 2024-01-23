import { useRoutes } from 'react-router-dom'
import { UserCommunityMemberDetailFeature } from './user-community-member-detail.feature'
import { UserCommunityMemberCreateFeature } from './user-community-member-create.feature'
import { UserCommunityMemberListFeature } from './user-community-member-list.feature'

export default function UserCommunityMemberRoutes() {
  return useRoutes([
    { path: '', element: <UserCommunityMemberListFeature /> },
    {
      path: 'create',
      element: <UserCommunityMemberCreateFeature />,
    },
    { path: ':communityMemberId/*', element: <UserCommunityMemberDetailFeature /> },
  ])
}
