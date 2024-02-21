import { UserCreateSnapshotInput, UserFindManySnapshotInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManySnapshot(props: Partial<UserFindManySnapshotInput> & { communityId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManySnapshotInput = { page, limit, search, communityId: props.communityId }
  const query = useQuery({
    queryKey: ['user', 'find-many-snapshot', input],
    queryFn: () => sdk.userFindManySnapshot({ input }).then((res) => res.data),
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
    createSnapshot: (input: UserCreateSnapshotInput) =>
      sdk
        .userCreateSnapshot({ input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.created) {
            toastSuccess(`Snapshot created`)
          } else {
            toastError(`Snapshot not created`)
          }
          await query.refetch()
          return !!res.created
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    deleteSnapshot: (snapshotId: string) =>
      sdk.userDeleteSnapshot({ snapshotId }).then(() => {
        toastSuccess('Snapshot deleted')
        return query.refetch()
      }),
  }
}
