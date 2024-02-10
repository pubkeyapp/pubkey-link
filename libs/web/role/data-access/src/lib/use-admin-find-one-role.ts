import { AdminUpdateRoleInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneRole({ roleId }: { roleId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-role', roleId],
    queryFn: () => sdk.adminFindOneRole({ roleId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateRole: async (input: AdminUpdateRoleInput) =>
      sdk
        .adminUpdateRole({ roleId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Role updated')
            await query.refetch()
            return true
          }
          toastError('Role not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
