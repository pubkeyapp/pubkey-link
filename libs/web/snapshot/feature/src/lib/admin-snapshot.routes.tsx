import { useRoutes } from 'react-router-dom'
import { AdminSnapshotDetailFeature } from './admin-snapshot-detail.feature'
import { AdminSnapshotListFeature } from './admin-snapshot-list.feature'

export default function AdminSnapshotRoutes() {
  return useRoutes([
    { path: '', element: <AdminSnapshotListFeature /> },
    { path: ':snapshotId/*', element: <AdminSnapshotDetailFeature /> },
  ])
}
