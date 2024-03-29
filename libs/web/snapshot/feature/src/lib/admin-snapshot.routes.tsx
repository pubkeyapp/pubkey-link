import { useRoutes } from 'react-router-dom'
import { AdminSnapshotDetailFeature } from './admin-snapshot-detail.feature'
import { AdminSnapshotListFeature } from './admin-snapshot-list.feature'

export default function AdminSnapshotRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <AdminSnapshotListFeature communityId={communityId} /> },
    { path: ':snapshotId/*', element: <AdminSnapshotDetailFeature /> },
  ])
}
