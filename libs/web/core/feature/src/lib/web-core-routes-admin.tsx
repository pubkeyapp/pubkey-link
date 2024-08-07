import { AdminCommunityFeature } from '@pubkey-link/web-community-feature'
import { DevAdminRoutes } from '@pubkey-link/web-dev-feature'
import { AdminLogFeature } from '@pubkey-link/web-log-feature'
import { AdminNetworkFeature } from '@pubkey-link/web-network-feature'
import { AdminUserFeature } from '@pubkey-link/web-user-feature'
import { AdminVerifyFeature } from '@pubkey-link/web-verify-feature'
import { UiContainer, UiDashboardGrid, UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import {
  IconChartBar,
  IconCheckupList,
  IconFileText,
  IconNetwork,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react'
import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const AdminStatsFeature = lazy(() => import('./web-core-admin-stats'))

const links: UiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-crud generator
  { label: 'Communities', icon: IconUsersGroup, to: '/admin/communities' },
  { label: 'Logs', icon: IconFileText, to: '/admin/logs' },
  { label: 'Networks', icon: IconNetwork, to: '/admin/networks' },
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
  { label: 'Stats', icon: IconChartBar, to: '/admin/stats' },
  { label: 'Verify', icon: IconCheckupList, to: '/admin/verify' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-crud generator
  { path: 'communities/*', element: <AdminCommunityFeature /> },
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'logs/*', element: <AdminLogFeature /> },
  { path: 'networks/*', element: <AdminNetworkFeature /> },
  { path: 'stats/*', element: <AdminStatsFeature /> },
  { path: 'users/*', element: <AdminUserFeature /> },
  { path: 'verify/*', element: <AdminVerifyFeature /> },
]

export default function WebCoreRoutesAdmin() {
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
