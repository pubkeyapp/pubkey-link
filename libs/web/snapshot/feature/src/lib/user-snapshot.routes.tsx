import { useRoutes } from 'react-router-dom'
import { UserSnapshotDetailFeature } from './user-snapshot-detail.feature'
import { UserSnapshotListFeature } from './user-snapshot-list.feature'

export default function UserSnapshotRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <UserSnapshotListFeature communityId={communityId} /> },
    { path: ':snapshotId/*', element: <UserSnapshotDetailFeature /> },
  ])
}
