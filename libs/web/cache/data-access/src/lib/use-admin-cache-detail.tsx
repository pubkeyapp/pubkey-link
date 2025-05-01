import { NetworkCluster } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminCacheDetail({ cacheId, cluster }: { cacheId: string; cluster: NetworkCluster }) {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['admin-cache-detail', { cacheId, cluster }],
    queryFn: () => sdk.adminCacheDetail({ cacheId, cluster }).then((res) => res?.data?.adminCacheDetail),
  })
}
