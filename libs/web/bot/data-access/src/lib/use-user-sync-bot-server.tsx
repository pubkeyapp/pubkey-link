import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useUserSyncBotServer({ botId, serverId }: { botId: string; serverId: string }) {
  const sdk = useSdk()
  return useMutation({
    mutationKey: ['user', 'sync-server', { botId, serverId }],
    mutationFn: (serverId: string) =>
      sdk
        .userSyncBotServer({ botId, serverId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            if (res.synced) {
              toastSuccess('Bot synced server')
            } else {
              toastError('Bot did not sync server')
            }
            return true
          }
          toastError('Error syncing server')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  })
}
