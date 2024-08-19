import { AdminFindManyLogInput, LogLevel } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyLog(props: Partial<AdminFindManyLogInput> & { communityId?: string; userId?: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 50)
  const [page, setPage] = useState(props?.page ?? 1)
  const [level, setLevel] = useState<LogLevel | undefined>(undefined)
  const [search, setSearch] = useState<string>(props?.search ?? '')
  const [interval, setInterval] = useState<number>(60)
  const input: AdminFindManyLogInput = {
    page,
    limit,
    search,
    communityId: props.communityId,
    userId: props.userId,
    level,
  }
  const query = useQuery({
    queryKey: ['admin', 'find-many-log', input],
    queryFn: () => sdk.adminFindManyLog({ input }).then((res) => res.data),
    refetchInterval: 1000 * interval,
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    interval,
    setInterval,
    level,
    setLevel,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    deleteLog: (logId: string) =>
      sdk
        .adminDeleteLog({ logId })
        .then(() => {
          toastSuccess('Log deleted')
          return query.refetch()
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    purgeLogs: () =>
      sdk
        .adminPurgeLogs()
        .then(() => {
          toastSuccess('Logs purged')
          return query.refetch()
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  }
}
