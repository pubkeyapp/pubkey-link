import { NetworkCluster } from '@pubkey-link/sdk'
import { useUserGetTokenMetadata } from '@pubkey-link/web-network-data-access'
import { NetworkTokenUiItem } from '@pubkey-link/web-network-token-ui'
import { UiDebug, UiError, UiLoader, UiStack } from '@pubkey-ui/core'

export function NetworkUiGetTokenMetadata({ cluster, account }: { cluster: NetworkCluster; account: string }) {
  const query = useUserGetTokenMetadata({ account, cluster })

  return query.isLoading ? (
    <UiLoader />
  ) : query.isError ? (
    <UiError message={query.error.message} />
  ) : query.data ? (
    <UiStack>
      <NetworkTokenUiItem networkToken={query.data?.result} />
      <UiDebug data={query.data} />
    </UiStack>
  ) : (
    <UiError message="No data" />
  )
}
