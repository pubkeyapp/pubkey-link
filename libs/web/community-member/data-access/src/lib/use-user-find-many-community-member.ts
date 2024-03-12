import {
  CommunityMember,
  CommunityRole,
  UserCreateCommunityMemberInput,
  UserFindManyCommunityMemberInput,
} from '@pubkey-link/sdk'
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
  const [role, setRole] = useState<CommunityRole | undefined>(props?.role ?? undefined)

  const input: UserFindManyCommunityMemberInput = { page, limit, search, communityId: props.communityId, role }
  const query = useQuery({
    queryKey: ['user', 'find-many-community-member', input],
    queryFn: () => sdk.userFindManyCommunityMember({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items: CommunityMember[] = query.data?.paging.data ?? []

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
        .userCreateCommunityMember({ communityId: props.communityId, input })
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
      sdk.userDeleteCommunityMember({ communityMemberId }).then(() => {
        toastSuccess('CommunityMember deleted')
        return query.refetch()
      }),
  }
}
