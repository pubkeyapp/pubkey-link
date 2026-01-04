import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneNetworkToken({ account }: { account: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-network-token', account],
    queryFn: () => sdk.userFindOneNetworkToken({ account }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
