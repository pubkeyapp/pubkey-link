import { useAdminFindOneNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminNetworkTokenDetailOverviewTab({ networkTokenId }: { networkTokenId: string }) {
  const { item, query } = useAdminFindOneNetworkToken({ networkTokenId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="NetworkToken not found." />
  }

  return <UiDebug data={item} />
}
