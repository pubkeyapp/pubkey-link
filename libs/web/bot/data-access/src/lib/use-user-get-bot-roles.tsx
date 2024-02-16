import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useUserGetBotRoles({ botId, serverId }: { botId: string; serverId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'get-bot-roles', { botId, serverId }],
    queryFn: () => sdk.userGetBotRoles({ botId, serverId }).then((res) => res.data),
  })

  const roles = query.data?.items || []
  return {
    query,
    roleOptions: roles.map((role) => ({ value: role.id, label: role.name })),
  }
}

export function useUserSyncBotServerRoles({ botId, serverId }: { botId: string; serverId: string }) {
  const sdk = useSdk()
  return useMutation({
    mutationKey: ['user', 'sync-server-roles', { botId, serverId }],
    mutationFn: (serverId: string) =>
      sdk
        .userSyncBotServerRoles({ botId, serverId })
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
