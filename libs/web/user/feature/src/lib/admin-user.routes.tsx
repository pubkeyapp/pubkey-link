import { useRoutes } from 'react-router-dom'
import { AdminUserDetailFeature } from './admin-user-detail-feature'
import { AdminUserListFeature } from './admin-user-list-feature'

export default function AdminUserRoutes() {
  return useRoutes([
    { path: '', element: <AdminUserListFeature /> },
    { path: ':userId/*', element: <AdminUserDetailFeature /> },
  ])
}
