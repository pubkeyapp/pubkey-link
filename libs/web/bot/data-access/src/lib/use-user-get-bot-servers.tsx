import { useQuery } from '@tanstack/react-query'
import { useSdk } from '@pubkey-link/web-core-data-access'

export function useUserGetBotServers({ botId }: { botId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user', 'get-bot-servers', { botId }],
    queryFn: () => sdk.userGetBotServers({ botId }).then((res) => res.data),
  })
}
