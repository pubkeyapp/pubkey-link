import { DevAdminRoutes } from '@pubkey-link/web-dev-feature'
import { AdminUserFeature } from '@pubkey-link/web-user-feature'
import { UiContainer, UiDashboardGrid, UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconUsers } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-crud generator
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-crud generator
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
