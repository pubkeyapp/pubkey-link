import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneLog({ logId }: { logId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-log', logId],
    queryFn: () => sdk.userFindOneLog({ logId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
