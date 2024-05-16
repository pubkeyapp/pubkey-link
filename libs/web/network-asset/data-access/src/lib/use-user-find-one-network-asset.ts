import { NetworkAsset, NetworkCluster } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneNetworkAsset({ account, cluster }: { account: string; cluster: NetworkCluster }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-network-asset', { account, cluster }],
    queryFn: () => sdk.userFindOneNetworkAsset({ account, cluster }).then((res) => res.data),
    retry: 0,
  })
  const item: NetworkAsset | undefined = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
