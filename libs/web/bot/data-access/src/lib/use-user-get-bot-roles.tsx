import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

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
