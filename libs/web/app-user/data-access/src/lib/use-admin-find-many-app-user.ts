import { AdminCreateAppUserInput, AdminFindManyAppUserInput, AdminUpdateAppUserInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyAppUser(props: Partial<AdminFindManyAppUserInput> & { appId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyAppUserInput = { page, limit, search, appId: props.appId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-app-user', input],
    queryFn: () => sdk.adminFindManyAppUser({ input }).then((res) => res.data),
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
    createAppUser: (input: AdminCreateAppUserInput) =>
      sdk
        .adminCreateAppUser({ input: { ...input, appId: props.appId } })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.created) {
            toastSuccess(`AppUser created`)
          } else {
            toastError(`AppUser not created`)
          }
          await query.refetch()
          return !!res.created
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    deleteAppUser: (appUserId: string) =>
      sdk.adminDeleteAppUser({ appUserId }).then(() => {
        toastSuccess('App User deleted')
        return query.refetch()
      }),
    updateAppUser: async (appUserId: string, input: AdminUpdateAppUserInput) =>
      sdk
        .adminUpdateAppUser({ appUserId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('App User updated')
            await query.refetch()
            return true
          }
          toastError('App User not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
