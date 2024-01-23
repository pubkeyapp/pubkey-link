import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@pubkey-link/web-core-data-access'

export function useUserGetBotRoles({ botId, serverId }: { botId: string; serverId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user', 'get-bot-roles', { botId, serverId }],
    queryFn: () => sdk.userGetBotRoles({ botId, serverId }).then((res) => res.data),
  })
}
