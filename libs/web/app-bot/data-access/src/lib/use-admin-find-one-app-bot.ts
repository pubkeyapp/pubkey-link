import { AdminUpdateAppBotInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneAppBot({ appBotId }: { appBotId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-app-bot', appBotId],
    queryFn: () => sdk.adminFindOneAppBot({ appBotId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateAppBot: async (input: AdminUpdateAppBotInput) =>
      sdk
        .adminUpdateAppBot({ appBotId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('AppBot updated')
            await query.refetch()
            return true
          }
          toastError('AppBot not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
