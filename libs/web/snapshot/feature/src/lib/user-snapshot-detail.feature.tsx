import { Group } from '@mantine/core'
import { useUserFindOneSnapshot } from '@pubkey-link/web-snapshot-data-access'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserSnapshotDetailOverviewTab } from './user-snapshot-detail-overview.tab'

export function UserSnapshotDetailFeature() {
  const { snapshotId } = useParams<{ snapshotId: string }>() as { snapshotId: string }
  const { item, query } = useUserFindOneSnapshot({ snapshotId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Snapshot not found." />
  }

  return (
    <UiPage
      title={<Group>{item.name}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UserSnapshotDetailOverviewTab snapshotId={snapshotId} />
    </UiPage>
  )
}
