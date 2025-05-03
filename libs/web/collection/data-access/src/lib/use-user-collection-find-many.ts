import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserCollectionFindMany() {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user-collection-find-many'],
    queryFn: async () => sdk.userCollectionFindMany().then((res) => res?.data?.items ?? []),
  })
}
