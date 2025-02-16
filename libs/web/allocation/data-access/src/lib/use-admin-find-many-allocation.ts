import { AdminCreateAllocationInput, AdminFindManyAllocationInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyAllocation(props?: Partial<AdminFindManyAllocationInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyAllocationInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-allocation', input],
    queryFn: () => sdk.adminFindManyAllocation({ input }).then((res) => res.data),
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
    createAllocation: (input: AdminCreateAllocationInput) =>
      sdk
        .adminCreateAllocation({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Allocation created`)
          } else {
            toastError(`Allocation not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteAllocation: (allocationId: string) =>
      sdk.adminDeleteAllocation({ allocationId }).then(() => {
        toastSuccess('Allocation deleted')
        return query.refetch()
      }),
  }
}
