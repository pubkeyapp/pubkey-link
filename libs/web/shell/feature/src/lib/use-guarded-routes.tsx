import { UserRole, UserStatus } from '@pubkey-link/sdk'
import { AuthUiRouteGuard, AuthUiUserRoleGuard, AuthUiUserStatusGuard } from '@pubkey-link/web-auth-ui'
import { UiLoader } from '@pubkey-ui/core'

import { Navigate, Outlet, RouteObject, useRoutes } from 'react-router-dom'
import { ShellLayout } from './shell-layout'

export function useGuardedRoutes({
  admin,
  layout,
  index,
  full,
  public: publicRoutes,
}: {
  index: string
  admin: RouteObject[]
  layout: RouteObject[]
  full: RouteObject[]
  public: RouteObject[]
}) {
  return useRoutes([
    { index: true, element: <Navigate to={index} replace /> },
    {
      // This guard makes sure that the user is authenticated
      element: <AuthUiRouteGuard redirectTo="/login" loader={<UiLoader />} />,
      children: [
        {
          // This guard makes sure that the user is active
          element: <AuthUiUserStatusGuard status={UserStatus.Active} />,
          children: [
            {
              // This adds the main layout to the routes
              element: (
                <ShellLayout>
                  <Outlet />
                </ShellLayout>
              ),
              children: [
                {
                  path: '/admin/*',
                  // This guard makes sure that the user has the admin role
                  element: <AuthUiUserRoleGuard role={UserRole.Admin} />,
                  children: [...admin],
                },
                ...layout,
              ],
            },
            // Here you can add routes that are not part of the main layout
            ...full,
          ],
        },
      ],
    },
    ...publicRoutes,
  ])
}
