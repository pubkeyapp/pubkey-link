import { useRoutes } from 'react-router-dom'
import { UserAppCreateFeature } from './user-app-create.feature'
import { UserAppDetailFeature } from './user-app-detail.feature'
import { UserAppListFeature } from './user-app-list.feature'

export default function UserAppRoutes() {
  return useRoutes([
    { path: '', element: <UserAppListFeature /> },
    {
      path: 'create',
      element: <UserAppCreateFeature />,
    },
    { path: ':appId/*', element: <UserAppDetailFeature /> },
  ])
}
