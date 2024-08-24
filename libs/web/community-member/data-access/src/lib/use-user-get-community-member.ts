import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserGetCommunityMember({ communityId }: { communityId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'getCommunityMember', communityId],
    queryFn: () => sdk.userGetCommunityMember({ communityId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.member ?? undefined

  return {
    item,
    query,
  }
}
