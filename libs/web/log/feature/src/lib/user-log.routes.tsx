import { useRoutes } from 'react-router-dom'
import { UserLogDetailFeature } from './user-log-detail.feature'
import { UserLogListFeature } from './user-log-list.feature'

export default function UserLogRoutes(props: { communityId?: string; networkAssetId?: string }) {
  return useRoutes([
    { path: '', element: <UserLogListFeature {...props} /> },
    { path: ':logId/*', element: <UserLogDetailFeature /> },
  ])
}
