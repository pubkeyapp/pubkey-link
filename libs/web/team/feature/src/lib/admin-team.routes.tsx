import { useRoutes } from 'react-router-dom'
import { AdminTeamDetailFeature } from './admin-team-detail.feature'
import { AdminTeamListFeature } from './admin-team-list.feature'

export default function AdminTeamRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <AdminTeamListFeature communityId={communityId} /> },
    { path: ':teamId/*', element: <AdminTeamDetailFeature /> },
  ])
}
