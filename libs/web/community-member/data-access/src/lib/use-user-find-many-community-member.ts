import { UserFindManyCommunityMemberInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyCommunityMember(
  props: Partial<UserFindManyCommunityMemberInput> & { communityId: string },
) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyCommunityMemberInput = { page, limit, search, communityId: props.communityId }
  const query = useQuery({
    queryKey: ['user', 'find-many-community-member', input],
    queryFn: () => sdk.userFindManyCommunityMember({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    deleteCommunityMember: (communityMemberId: string) =>
      sdk.userDeleteCommunityMember({ communityMemberId }).then(() => {
        toastSuccess('CommunityMember deleted')
        return query.refetch()
      }),
  }
}
