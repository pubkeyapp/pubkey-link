import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminCacheConfig() {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['admin-cache-config'],
    queryFn: () => sdk.adminCacheConfig().then((res) => res?.data?.adminCacheConfig),
  })
}
