import { useAdminFindOneLog } from '@pubkey-link/web-log-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminLogDetailOverviewTab({ logId }: { logId: string }) {
  const { item, query } = useAdminFindOneLog({ logId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Log not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
