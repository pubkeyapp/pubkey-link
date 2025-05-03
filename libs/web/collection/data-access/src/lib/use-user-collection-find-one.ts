import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserCollectionFindOne({ collectionId }: { collectionId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user-collection-find-one', { collectionId }],
    queryFn: async () => {
      return sdk.userCollectionFindOne({ collectionId }).then((res) => res?.data?.item)
    },
  })
}

export function useUserCollectionAssetFindOne({ assetId, collectionId }: { assetId: string; collectionId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user-collection-asset-find-one', { assetId, collectionId }],
    queryFn: async () => {
      return null
    },
  })
}
