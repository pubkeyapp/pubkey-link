import { lazy } from 'react'

export const AdminCommunityMemberFeature = lazy(() => import('./lib/admin-community-member.routes'))

export const UserCommunityMemberFeature = lazy(() => import('./lib/user-community-member.routes'))
