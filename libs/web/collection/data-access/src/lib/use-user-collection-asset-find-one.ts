import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserCollectionAssetFindOne({ assetId, collectionId }: { assetId: string; collectionId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user-collection-asset-find-one', { assetId, collectionId }],
    queryFn: async () => {
      return null
    },
  })
}
