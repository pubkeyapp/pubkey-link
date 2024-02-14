import { UserUpdateBotServerInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneBotServer({ botId, serverId }: { botId: string; serverId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-bot-server', { botId, serverId }],
    queryFn: () => sdk.userFindOneBotServer({ botId, serverId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateBotServer: async (input: UserUpdateBotServerInput) =>
      sdk
        .userUpdateBotServer({ botId, serverId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Bot Server updated')
            await query.refetch()
            return true
          }
          toastError('Bot Server not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
