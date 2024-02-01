import { Group } from '@mantine/core'
import { useAdminFindOneLog } from '@pubkey-link/web-log-data-access'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminLogDetailOverviewTab } from './admin-log-detail-overview.tab'

export function AdminLogDetailFeature() {
  const { logId } = useParams<{ logId: string }>() as { logId: string }
  const { item, query } = useAdminFindOneLog({ logId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Log not found." />
  }

  return (
    <UiPage
      title={<Group>{item.message}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <AdminLogDetailOverviewTab logId={logId} />
    </UiPage>
  )
}
