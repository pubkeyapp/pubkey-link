import { lazy } from 'react'

export const AdminUserFeature = lazy(() => import('./lib/admin-user-feature'))
export const UserFeature = lazy(() => import('./lib/user-feature'))
