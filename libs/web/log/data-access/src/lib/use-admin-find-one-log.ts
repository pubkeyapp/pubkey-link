import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneLog({ logId }: { logId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-log', logId],
    queryFn: () => sdk.adminFindOneLog({ logId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
