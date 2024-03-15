import { UserCreateTeamInput, UserFindManyTeamInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyTeam(props: Partial<UserFindManyTeamInput> & { communityId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyTeamInput = { page, limit, search, communityId: props.communityId }
  const query = useQuery({
    queryKey: ['user', 'find-many-team', input],
    queryFn: () => sdk.userFindManyTeam({ input }).then((res) => res.data),
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
    createTeam: (input: UserCreateTeamInput) =>
      sdk
        .userCreateTeam({ input: { ...input, communityId: props.communityId } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Team created`)
          } else {
            toastError(`Team not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteTeam: (teamId: string) =>
      sdk.userDeleteTeam({ teamId }).then(() => {
        toastSuccess('Team deleted')
        return query.refetch()
      }),
  }
}
