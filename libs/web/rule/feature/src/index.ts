import { lazy } from 'react'

export const AdminRuleFeature = lazy(() => import('./lib/admin-rule.routes'))
export const UserRuleFeature = lazy(() => import('./lib/user-rule.routes'))
