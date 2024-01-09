import { UserCreateAppInput, UserFindManyAppInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyApp(props?: Partial<UserFindManyAppInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 12)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyAppInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['user', 'find-many-app', input],
    queryFn: () => sdk.userFindManyApp({ input }).then((res) => res.data),
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
    createApp: (input: UserCreateAppInput) =>
      sdk
        .userCreateApp({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`App created`)
          } else {
            toastError(`App not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteApp: (appId: string) =>
      sdk.userDeleteApp({ appId }).then(() => {
        toastSuccess('App deleted')
        return query.refetch()
      }),
  }
}
