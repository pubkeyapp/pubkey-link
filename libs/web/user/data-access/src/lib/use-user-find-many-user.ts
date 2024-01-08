import { UserFindManyUserInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindManyUser(input: UserFindManyUserInput) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-many-user', input],
    queryFn: () => sdk.userFindManyUser({ input }).then((res) => res.data),
    retry: 0,
  })

  return {
    data: query.data?.paging.data ?? [],
    meta: query.data?.paging.meta,
    query,
  }
}
