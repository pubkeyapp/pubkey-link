import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@pubkey-link/web-core-data-access'

export function useUserGetBotServer({ botId, serverId }: { botId: string; serverId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user', 'get-bot-server', { botId, serverId }],
    queryFn: () => sdk.userGetBotServer({ botId, serverId }).then((res) => res.data),
  })
}
