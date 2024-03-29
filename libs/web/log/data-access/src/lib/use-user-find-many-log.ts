import { LogLevel, UserFindManyLogInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyLog(props: Partial<UserFindManyLogInput>) {
  const sdk = useSdk()
  const [level, setLevel] = useState<LogLevel | undefined>(props?.level ?? undefined)
  const [limit, setLimit] = useState(props?.limit ?? 20)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyLogInput = {
    page,
    limit,
    search,
    level,
    communityId: props.communityId ?? undefined,
    networkAssetId: props.networkAssetId ?? undefined,
  }
  const query = useQuery({
    queryKey: ['user', 'find-many-log', input],
    queryFn: () => sdk.userFindManyLog({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
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
  }
}
