import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneNetworkAsset({ networkAssetId }: { networkAssetId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-network-asset', networkAssetId],
    queryFn: () => sdk.adminFindOneNetworkAsset({ networkAssetId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
