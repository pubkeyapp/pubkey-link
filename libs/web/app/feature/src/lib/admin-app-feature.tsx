import { useRoutes } from 'react-router-dom'
import { AdminAppDetailFeature } from './admin-app-detail.feature'
import { AdminAppCreateFeature } from './admin-app-create.feature'
import { AdminAppListFeature } from './admin-app-list.feature'

export default function AdminAppRoutes() {
  return useRoutes([
    { path: '', element: <AdminAppListFeature /> },
    {
      path: 'create',
      element: <AdminAppCreateFeature />,
    },
    { path: ':appId/*', element: <AdminAppDetailFeature /> },
  ])
}
