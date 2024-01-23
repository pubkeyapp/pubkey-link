import { AdminUpdateBotInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneBot({ botId }: { botId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-bot', botId],
    queryFn: () => sdk.adminFindOneBot({ botId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateBot: async (input: AdminUpdateBotInput) =>
      sdk
        .adminUpdateBot({ botId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Bot updated')
            await query.refetch()
            return true
          }
          toastError('Bot not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
