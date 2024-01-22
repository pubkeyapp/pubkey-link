import { useRoutes } from 'react-router-dom'
import { AdminUserCreateFeature } from './admin-user-create-feature'
import { AdminUserDetailFeature } from './admin-user-detail-feature'
import { AdminUserListFeature } from './admin-user-list-feature'

export default function AdminUserRoutes() {
  return useRoutes([
    { path: '', element: <AdminUserListFeature /> },
    {
      path: 'create',
      element: <AdminUserCreateFeature />,
    },
    { path: ':userId/*', element: <AdminUserDetailFeature /> },
  ])
}
