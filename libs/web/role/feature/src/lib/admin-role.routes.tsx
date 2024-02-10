import { useRoutes } from 'react-router-dom'
import { AdminRoleDetailFeature } from './admin-role-detail.feature'
import { AdminRoleCreateFeature } from './admin-role-create.feature'
import { AdminRoleListFeature } from './admin-role-list.feature'

export default function AdminRoleRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <AdminRoleListFeature communityId={communityId} /> },
    {
      path: 'create',
      element: <AdminRoleCreateFeature communityId={communityId} />,
    },
    { path: ':roleId/*', element: <AdminRoleDetailFeature /> },
  ])
}
