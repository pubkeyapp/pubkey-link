import { useRoutes } from 'react-router-dom'
import { AdminLogDetailFeature } from './admin-log-detail.feature'
import { AdminLogListFeature } from './admin-log-list.feature'

export default function AdminLogRoutes({ communityId, userId }: { communityId?: string; userId?: string }) {
  return useRoutes([
    { path: '', element: <AdminLogListFeature communityId={communityId} userId={userId} /> },
    { path: ':logId/*', element: <AdminLogDetailFeature /> },
  ])
}
