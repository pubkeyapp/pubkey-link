import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserCollectionAssetFindOne(props: { assetId: string; collectionId: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['user-collection-asset-find-one', props],
    queryFn: async () => {
      return sdk
        .userCollectionAssetFindOne({ input: { collectionId: props.collectionId, assetId: props.assetId } })
        .then((res) => res?.data?.item)
    },
  })
}
