import { useAdminFindOneSnapshot } from '@pubkey-link/web-snapshot-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminSnapshotDetailOverviewTab({ snapshotId }: { snapshotId: string }) {
  const { item, query } = useAdminFindOneSnapshot({ snapshotId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Snapshot not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
