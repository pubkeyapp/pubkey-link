import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminCacheStatus() {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['admin-cache'],
    queryFn: () => sdk.adminCacheStatus().then((res) => res?.data?.adminCacheStatus),
  })
}
