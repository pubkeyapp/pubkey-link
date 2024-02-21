import { lazy } from 'react'

export const AdminSnapshotFeature = lazy(() => import('./lib/admin-snapshot.routes'))
export const UserSnapshotFeature = lazy(() => import('./lib/user-snapshot.routes'))
