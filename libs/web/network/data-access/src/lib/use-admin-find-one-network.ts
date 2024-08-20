import { AdminUpdateNetworkInput, NetworkCluster } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneNetwork({ networkId }: { networkId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-network', networkId],
    queryFn: () => sdk.adminFindOneNetwork({ networkId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    cleanupNetworkAssets: () =>
      sdk.adminCleanupNetworkAssets({ cluster: item?.cluster ?? NetworkCluster.SolanaMainnet }).then(() => {
        toastSuccess('NetworkAssets cleaned up')
        return query.refetch()
      }),
    syncNetworkAssets: () =>
      sdk.adminSyncNetworkAssets().then(() => {
        toastSuccess('NetworkAssets synced')
        return query.refetch()
      }),
    verifyNetworkAssets: () =>
      sdk.adminVerifyNetworkAssets().then(() => {
        toastSuccess('NetworkAssets verified')
        return query.refetch()
      }),
    updateNetwork: async (input: AdminUpdateNetworkInput) =>
      sdk
        .adminUpdateNetwork({ networkId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Network updated')
            await query.refetch()
            return true
          }
          toastError('Network not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
