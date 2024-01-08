import { AdminUpdateAppInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneApp({ appId }: { appId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-app', appId],
    queryFn: () => sdk.adminFindOneApp({ appId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateApp: async (input: AdminUpdateAppInput) =>
      sdk
        .adminUpdateApp({ appId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('App updated')
            await query.refetch()
            return true
          }
          toastError('App not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
