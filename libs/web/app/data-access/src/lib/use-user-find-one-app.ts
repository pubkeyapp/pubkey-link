import { AppUserRole, UserUpdateAppInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneApp({ appId }: { appId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-app', appId],
    queryFn: () => sdk.userFindOneApp({ appId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    isAppAdmin: item?.user?.role === AppUserRole.Admin,
    updateApp: async (input: UserUpdateAppInput) =>
      sdk
        .userUpdateApp({ appId, input })
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
