import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneUserById({ userId }: { userId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-user-by-id', userId],
    queryFn: () => sdk.userFindOneUserById({ userId }).then((res) => res.data),
    retry: 0,
  })

  return {
    user: query.data?.item,
    query,
  }
}
