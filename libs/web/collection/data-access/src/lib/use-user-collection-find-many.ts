import { UserCollectionFindManyInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserCollectionFindMany({ communityId }: { communityId: string }) {
  const sdk = useSdk()
  const input: UserCollectionFindManyInput = { communityId }

  return useQuery({
    queryKey: ['user-collection-find-many'],
    queryFn: async () => sdk.userCollectionFindMany({ input }).then((res) => res?.data?.items ?? []),
  })
}
