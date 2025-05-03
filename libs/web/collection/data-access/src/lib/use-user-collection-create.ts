import { UserCollectionCreateInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUserCollectionCreate({ communityId }: { communityId: string }) {
  const sdk = useSdk()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: Omit<UserCollectionCreateInput, 'communityId'>) =>
      sdk.userCollectionCreate({ input: { ...input, communityId } }).then((res) => res?.data ?? null),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user-collection-find-many'] })
    },
  })
}
