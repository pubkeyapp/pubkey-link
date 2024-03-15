import { useRoutes } from 'react-router-dom'
import { UserTeamCreateFeature } from './user-team-create.feature'
import { UserTeamDetailFeature } from './user-team-detail.feature'
import { UserTeamListFeature } from './user-team-list.feature'

export default function UserTeamRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <UserTeamListFeature communityId={communityId} /> },
    {
      path: 'create',
      element: <UserTeamCreateFeature communityId={communityId} />,
    },
    { path: ':teamId/*', element: <UserTeamDetailFeature /> },
  ])
}
