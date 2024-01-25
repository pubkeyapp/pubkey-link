import { AdminUpdateNetworkTokenInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneNetworkToken({ networkTokenId }: { networkTokenId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-network-token', networkTokenId],
    queryFn: () => sdk.adminFindOneNetworkToken({ networkTokenId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateNetworkToken: async (input: AdminUpdateNetworkTokenInput) =>
      sdk
        .adminUpdateNetworkToken({ networkTokenId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('NetworkToken updated')
            await query.refetch()
            return true
          }
          toastError('NetworkToken not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    updateNetworkTokenMetadata: async () =>
      sdk
        .adminUpdateNetworkTokenMetadata({ networkTokenId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Network Token metadata updated')
            await query.refetch()
            return true
          }
          toastError('Network Token metadata not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
