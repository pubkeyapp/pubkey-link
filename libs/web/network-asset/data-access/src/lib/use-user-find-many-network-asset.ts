import { NetworkCluster, NetworkTokenType, UserFindManyNetworkAssetInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyNetworkAsset(
  props: Partial<UserFindManyNetworkAssetInput> & { username: string; type: NetworkTokenType },
) {
  const sdk = useSdk()
  const [cluster, setCluster] = useState<NetworkCluster>(props?.cluster ?? NetworkCluster.SolanaMainnet)
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyNetworkAssetInput = {
    page,
    limit,
    search,
    cluster,
    username: props.username,
    type: props.type,
  }
  const query = useQuery({
    queryKey: ['user', 'find-many-network-asset', input],
    queryFn: () => sdk.userFindManyNetworkAsset({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    cluster,
    setCluster,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
  }
}
