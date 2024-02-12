import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserGetCommunityRole({ communityId }: { communityId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'GetCommunityRole', communityId],
    queryFn: () => sdk.userGetCommunityRole({ communityId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.role ?? undefined

  return {
    item,
    query,
  }
}
