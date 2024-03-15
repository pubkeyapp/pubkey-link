import { AdminFindManyCommunityMemberInput, CommunityRole, UserAddCommunityMemberInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyCommunityMember(
  props: Partial<AdminFindManyCommunityMemberInput> & { communityId: string },
) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')
  const [role, setRole] = useState<CommunityRole | undefined>(props?.role ?? undefined)

  const input: AdminFindManyCommunityMemberInput = { page, limit, search, communityId: props.communityId, role }
  const query = useQuery({
    queryKey: ['admin', 'find-many-community-member', input],
    queryFn: () => sdk.adminFindManyCommunityMember({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    role,
    setRole,
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
        .adminAddCommunityMember({ communityId: props.communityId, input })
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
      sdk.adminRemoveCommunityMember({ communityMemberId }).then(() => {
        toastSuccess('CommunityMember removed')
        return query.refetch()
      }),
  }
}
