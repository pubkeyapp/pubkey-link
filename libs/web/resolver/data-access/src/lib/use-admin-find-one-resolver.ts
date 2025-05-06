import { AdminUpdateResolverInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneResolver({ resolverId }: { resolverId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-resolver', resolverId],
    queryFn: () => sdk.adminFindOneResolver({ resolverId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateResolver: async (input: AdminUpdateResolverInput) =>
      sdk
        .adminUpdateResolver({ resolverId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Resolver updated')
            await query.refetch()
            return true
          }
          toastError('Resolver not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
