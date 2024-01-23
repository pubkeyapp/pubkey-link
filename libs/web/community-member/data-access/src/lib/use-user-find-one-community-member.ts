import { UserUpdateCommunityMemberInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneCommunityMember({ communityMemberId }: { communityMemberId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-community-member', communityMemberId],
    queryFn: () => sdk.userFindOneCommunityMember({ communityMemberId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateCommunityMember: async (input: UserUpdateCommunityMemberInput) =>
      sdk
        .userUpdateCommunityMember({ communityMemberId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('CommunityMember updated')
            await query.refetch()
            return true
          }
          toastError('CommunityMember not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
