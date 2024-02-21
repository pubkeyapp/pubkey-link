import { IconSettings } from '@tabler/icons-react'
import { AdminCommunityFeature } from '@pubkey-link/web-community-feature'
import { DevAdminRoutes } from '@pubkey-link/web-dev-feature'
import { AdminLogFeature } from '@pubkey-link/web-log-feature'
import { AdminNetworkFeature } from '@pubkey-link/web-network-feature'
import { AdminUserFeature } from '@pubkey-link/web-user-feature'
import { UiContainer, UiDashboardGrid, UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconFileText, IconNetwork, IconUsers, IconUsersGroup } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { AdminSnapshotFeature } from '@pubkey-link/web-snapshot-feature'

const links: UiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-crud generator
  { label: 'Communities', icon: IconUsersGroup, to: '/admin/communities' },
  { label: 'Logs', icon: IconFileText, to: '/admin/logs' },
  { label: 'Networks', icon: IconNetwork, to: '/admin/networks' },
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
  { label: 'Snapshots', icon: IconSettings, to: '/admin/snapshots' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-crud generator
  { path: 'communities/*', element: <AdminCommunityFeature /> },
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'logs/*', element: <AdminLogFeature /> },
  { path: 'networks/*', element: <AdminNetworkFeature /> },
  { path: 'users/*', element: <AdminUserFeature /> },
  { path: 'snapshots/*', element: <AdminSnapshotFeature /> },
]

export default function ShellAdminRoutes() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    {
      path: 'dashboard/*',
      element: (
        <UiContainer>
          <UiDashboardGrid links={links} />
        </UiContainer>
      ),
    },
    ...routes,
    { path: '*', element: <UiNotFound to="/admin" /> },
  ])
}
