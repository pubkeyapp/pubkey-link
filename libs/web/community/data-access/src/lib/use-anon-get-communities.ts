import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAnonGetCommunities() {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['anon', 'get-communities'],
    queryFn: () => sdk.anonGetCommunities().then((res) => res.data),
    retry: 0,
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
