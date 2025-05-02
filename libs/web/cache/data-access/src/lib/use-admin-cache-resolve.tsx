import { CacheConfigKey, NetworkCluster } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useMutation } from '@tanstack/react-query'

export function useAdminCacheResolve() {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (input: { cluster: NetworkCluster; resolverId: string }) =>
      sdk
        .adminCacheResolve({ cluster: input.cluster, cacheId: input.resolverId })
        .then((res) => res?.data?.adminCacheResolve),
  })
}

export function useAdminCacheConfigSet() {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (input: { key: CacheConfigKey; value: string }) =>
      sdk.adminCacheConfigSet({ key: input.key, value: input.value }).then((res) => res?.data?.adminCacheConfigSet),
  })
}
