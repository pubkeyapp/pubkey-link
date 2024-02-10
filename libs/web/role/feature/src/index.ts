import { lazy } from 'react'

export const AdminRoleFeature = lazy(() => import('./lib/admin-role.routes'))
export const UserRoleFeature = lazy(() => import('./lib/user-role.routes'))
