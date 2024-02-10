import { Community } from '@pubkey-link/sdk'
import { useRoutes } from 'react-router-dom'
import { UserRoleCreateFeature } from './user-role-create.feature'
import { UserRoleDetailFeature } from './user-role-detail.feature'
import { UserRoleListFeature } from './user-role-list.feature'

export default function UserRoleRoutes({ community }: { community: Community }) {
  return useRoutes([
    { path: '', element: <UserRoleListFeature community={community} /> },
    {
      path: 'create',
      element: <UserRoleCreateFeature community={community} />,
    },
    { path: ':roleId/*', element: <UserRoleDetailFeature community={community} /> },
  ])
}
