import { AdminCreateAppInput, AdminFindManyAppInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyApp(props?: Partial<AdminFindManyAppInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyAppInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-app', input],
    queryFn: () => sdk.adminFindManyApp({ input }).then((res) => res.data),
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
    createApp: (input: AdminCreateAppInput) =>
      sdk
        .adminCreateApp({ input })
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
      sdk.adminDeleteApp({ appId }).then(() => {
        toastSuccess('App deleted')
        return query.refetch()
      }),
  }
}
