import { lazy } from 'react'

export const UserLogFeature = lazy(() => import('./lib/user-log.routes'))

export const AdminLogFeature = lazy(() => import('./lib/admin-log.routes'))
