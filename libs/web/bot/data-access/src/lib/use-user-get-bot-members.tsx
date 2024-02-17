import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserGetBotMembers({ botId, serverId }: { botId: string; serverId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user', 'get-bot-members', { botId, serverId }],
    queryFn: () => sdk.userGetBotMembers({ botId, serverId }).then((res) => res.data),
  })
}