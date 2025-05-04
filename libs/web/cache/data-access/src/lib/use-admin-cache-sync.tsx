import { NetworkCluster } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useMutation } from '@tanstack/react-query'

export function useAdminCacheSync() {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (input: { cluster: NetworkCluster; cacheId: string }) =>
      sdk.adminCacheSync({ cluster: input.cluster, cacheId: input.cacheId }).then((res) => res?.data?.adminCacheSync),
  })
}
