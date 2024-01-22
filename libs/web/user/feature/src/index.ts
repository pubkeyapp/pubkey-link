import { lazy } from 'react'

export const AdminUserFeature = lazy(() => import('./lib/admin-user.routes'))
export const UserFeature = lazy(() => import('./lib/user-user.routes'))
