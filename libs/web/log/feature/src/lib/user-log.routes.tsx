import { useRoutes } from 'react-router-dom'
import { UserLogDetailFeature } from './user-log-detail.feature'
import { UserLogListFeature } from './user-log-list.feature'

export default function UserLogRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <UserLogListFeature communityId={communityId} /> },
    { path: ':logId/*', element: <UserLogDetailFeature /> },
  ])
}
