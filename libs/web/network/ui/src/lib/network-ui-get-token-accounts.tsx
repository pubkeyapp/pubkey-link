import { NetworkCluster } from '@pubkey-link/sdk'
import { useUserGetTokenAccounts } from '@pubkey-link/web-network-data-access'
import { UiDebug, UiError, UiLoader, UiStack } from '@pubkey-ui/core'

export function NetworkUiGetTokenAccounts({ cluster, account }: { cluster: NetworkCluster; account: string }) {
  const query = useUserGetTokenAccounts({ account, cluster })

  return query.isLoading ? (
    <UiLoader />
  ) : query.isError ? (
    <UiError message={query.error.message} />
  ) : query.data ? (
    <UiStack>
      <UiDebug data={query.data} />
    </UiStack>
  ) : (
    <UiError message="No data" />
  )
}
