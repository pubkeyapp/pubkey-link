import { AdminFindManyCommunityMemberInput, CommunityRole, UserCreateCommunityMemberInput } from '@pubkey-link/sdk'
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
    createCommunityMember: (input: UserCreateCommunityMemberInput) =>
      sdk
        .adminCreateCommunityMember({ communityId: props.communityId, input })
        .then(async (res) => {
          if (res.data?.created) {
            toastSuccess('Community Member created')
          } else {
            toastError('Error creating Community Member')
          }
          await query.refetch()
        })
        .catch((error) => {
          toastError(`Error creating Community Member: ${error}`)
        }),
    deleteCommunityMember: (communityMemberId: string) =>
      sdk.adminDeleteCommunityMember({ communityMemberId }).then(() => {
        toastSuccess('CommunityMember deleted')
        return query.refetch()
      }),
  }
}
