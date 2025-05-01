import { NetworkCluster } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useAdminCacheStatus() {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['admin-cache'],
    queryFn: () => sdk.adminCacheStatus().then((res) => res?.data?.adminCacheStatus),
  })
}

export function useAdminCacheResolve() {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (input: { cluster: NetworkCluster; resolverId: string }) =>
      sdk
        .adminCacheResolve({ cluster: input.cluster, cacheId: input.resolverId })
        .then((res) => res?.data?.adminCacheResolve),
  })
}
