import { UserUpdateCommunityInput } from '@pubkey-link/sdk'
import { useUserGetCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneCommunity({ communityId }: { communityId: string }) {
  const { item: member, query: roleQuery } = useUserGetCommunityMember({ communityId })
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-community', communityId],
    queryFn: () => sdk.userFindOneCommunity({ communityId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined
  const isLoading = query.isLoading || roleQuery.isLoading

  return {
    item,
    member,
    communityAdmin: member?.admin,
    isLoading,
    updateCommunity: async (input: UserUpdateCommunityInput) =>
      sdk
        .userUpdateCommunity({ communityId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Community updated')
            await query.refetch()
            return true
          }
          toastError('Community not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
