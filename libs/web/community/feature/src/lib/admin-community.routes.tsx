import { useRoutes } from 'react-router-dom'
import { AdminCommunityDetailFeature } from './admin-community-detail.feature'
import { AdminCommunityCreateFeature } from './admin-community-create.feature'
import { AdminCommunityListFeature } from './admin-community-list.feature'

export default function AdminCommunityRoutes() {
  return useRoutes([
    { path: '', element: <AdminCommunityListFeature /> },
    {
      path: 'create',
      element: <AdminCommunityCreateFeature />,
    },
    { path: ':communityId/*', element: <AdminCommunityDetailFeature /> },
  ])
}
