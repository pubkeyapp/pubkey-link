import { AuthLoginFeature, AuthRegisterFeature } from '@pubkey-link/web-auth-feature'
import { HomeFeature } from '@pubkey-link/web-home-feature'
import { OnboardingFeature } from '@pubkey-link/web-onboarding-feature'
import { AnonVerifyFeature } from '@pubkey-link/web-verify-feature'
import { UiNotFound } from '@pubkey-ui/core'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useGuardedRoutes } from './use-guarded-routes'

export const LazyAdminFeature = lazy(() => import('./shell-admin.routes'))
export const LazyUserFeature = lazy(() => import('./shell-user.routes'))

export function ShellRoutes() {
  return useGuardedRoutes({
    index: '/dashboard',
    admin: [
      // Here you can add routes that are only accessible by admins under the /admin/* path
      // Visit /admin/custom-admin-page to see this route
      // { path: 'custom-admin-page', element: <div>CUSTOM ADMIN PAGE HERE</div> },
      { path: '*', element: <LazyAdminFeature /> },
    ],
    layout: [
      // Here you can add routes that are part of the main layout
      { path: '*', element: <LazyUserFeature /> },
    ],
    full: [
      // Here you can add routes that are not part of the main layout, visit /custom-full-page to see this route
      // { path: 'custom-full-page', element: <div>CUSTOM FULL PAGE</div> },
      { path: '/onboarding/*', element: <OnboardingFeature /> },
    ],
    public: [
      { path: '/verify/*', element: <AnonVerifyFeature /> },
      // Routes for the auth feature
      { path: '/login', element: <AuthLoginFeature /> },
      { path: '/register', element: <AuthRegisterFeature /> },
      // Homepage
      { path: '/*', element: <HomeFeature /> },
      // Routes for the 404 page
      { path: '/404', element: <UiNotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  })
}
