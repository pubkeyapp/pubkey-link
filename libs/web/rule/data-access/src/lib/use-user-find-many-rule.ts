import { UserCreateRuleInput, UserFindManyRuleInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyRule(props: Partial<UserFindManyRuleInput> & { communityId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyRuleInput = { page, limit, search, communityId: props.communityId }
  const query = useQuery({
    queryKey: ['user', 'find-many-rule', input],
    queryFn: () => sdk.userFindManyRule({ input }).then((res) => res.data),
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
    createRule: (input: UserCreateRuleInput) =>
      sdk
        .userCreateRule({ input: { ...input, communityId: props.communityId } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Rule created`)
          } else {
            toastError(`Rule not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteRule: (ruleId: string) =>
      sdk.userDeleteRule({ ruleId }).then(() => {
        toastSuccess('Rule deleted')
        return query.refetch()
      }),
  }
}
