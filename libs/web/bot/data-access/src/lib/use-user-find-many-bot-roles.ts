import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindManyBotRoles({ botId, serverId }: { botId: string; serverId?: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-many-bot-roles', { botId }],
    queryFn: () => sdk.userFindManyBotRoles({ botId, serverId }).then((res) => res.data),
    retry: 0,
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
