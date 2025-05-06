import { AdminCreateResolverInput, AdminFindManyResolverInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyResolver(props: AdminFindManyResolverInput) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyResolverInput = { page, limit, search, cluster: props.cluster }
  const query = useQuery({
    queryKey: ['admin', 'find-many-resolver', input],
    queryFn: () => sdk.adminFindManyResolver({ input }).then((res) => res.data),
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
    createResolver: (input: AdminCreateResolverInput) =>
      sdk
        .adminCreateResolver({ input: { ...input, cluster: props.cluster } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Resolver created`)
          } else {
            toastError(`Resolver not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteResolver: (resolverId: string) =>
      sdk.adminDeleteResolver({ resolverId }).then(() => {
        toastSuccess('Resolver deleted')
        return query.refetch()
      }),
  }
}
