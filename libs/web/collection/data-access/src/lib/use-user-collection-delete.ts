import { useSdk } from '@pubkey-link/web-core-data-access'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUserCollectionDelete() {
  const sdk = useSdk()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (collectionId: string) =>
      sdk.userCollectionDelete({ collectionId }).then((res) => res?.data ?? null),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user-collection-find-many'] })
    },
  })
}
