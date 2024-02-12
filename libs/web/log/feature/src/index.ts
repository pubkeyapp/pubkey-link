import { lazy } from 'react'

export const AdminLogFeature = lazy(() => import('./lib/admin-log.routes'))
export const UserLogFeature = lazy(() => import('./lib/user-log.routes'))
