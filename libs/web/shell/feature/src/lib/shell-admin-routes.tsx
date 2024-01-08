import { AdminAppFeature } from '@pubkey-link/web-app-feature'
import { DevAdminRoutes } from '@pubkey-link/web-dev-feature'
import { AdminUserFeature } from '@pubkey-link/web-user-feature'
import { UiContainer, UiDashboardGrid, UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconApps, IconUsers } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-feature generator
  { label: 'Apps', icon: IconApps, to: '/admin/apps' },
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
  { label: 'AppBots', icon: IconUsers, to: '/admin/app-bots' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-feature generator
  { path: 'apps/*', element: <AdminAppFeature /> },
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'users/*', element: <AdminUserFeature /> },
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
