import { lazy } from 'react'

export const AdminAppFeature = lazy(() => import('./lib/admin-app-feature'))
export const UserAppFeature = lazy(() => import('./lib/user-app-feature'))
