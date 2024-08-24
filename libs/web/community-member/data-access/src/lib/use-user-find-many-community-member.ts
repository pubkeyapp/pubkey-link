import { CommunityMember, UserAddCommunityMemberInput, UserFindManyCommunityMemberInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyCommunityMember(
  props: Partial<UserFindManyCommunityMemberInput> & { communityId: string },
) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')
  const [admin, setAdmin] = useState<boolean>(props?.admin ?? false)

  const input: UserFindManyCommunityMemberInput = { page, limit, search, communityId: props.communityId, admin }
  const query = useQuery({
    queryKey: ['user', 'find-many-community-member', input],
    queryFn: () => sdk.userFindManyCommunityMember({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items: CommunityMember[] = query.data?.paging.data ?? []

  return {
    items,
    query,
    admin,
    setAdmin,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    addCommunityMember: (input: UserAddCommunityMemberInput) =>
      sdk
        .userAddCommunityMember({ communityId: props.communityId, input })
        .then(async (res) => {
          if (res.data?.created) {
            toastSuccess('Community Member added')
          } else {
            toastError('Error adding Community Member')
          }
          await query.refetch()
        })
        .catch((error) => {
          toastError(`Error adding Community Member: ${error}`)
        }),
    removeCommunityMember: (communityMemberId: string) =>
      sdk.userRemoveCommunityMember({ communityMemberId }).then(() => {
        toastSuccess('CommunityMember removed')
        return query.refetch()
      }),
  }
}
