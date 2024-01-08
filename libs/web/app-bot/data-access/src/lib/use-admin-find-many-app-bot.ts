import { AdminCreateAppBotInput, AdminFindManyAppBotInput, AppBotProvider } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyAppBot(props: Partial<AdminFindManyAppBotInput> & { appId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyAppBotInput = { page, limit, search, appId: props.appId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-app-bot', input],
    queryFn: () => sdk.adminFindManyAppBot({ input }).then((res) => res.data),
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
    createAppBot: (input: AdminCreateAppBotInput) =>
      sdk
        .adminCreateAppBot({ input: { ...input, provider: AppBotProvider.Discord, appId: props.appId } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`AppBot created`)
          } else {
            toastError(`AppBot not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteAppBot: (appBotId: string) =>
      sdk.adminDeleteAppBot({ appBotId }).then(() => {
        toastSuccess('AppBot deleted')
        return query.refetch()
      }),
  }
}
