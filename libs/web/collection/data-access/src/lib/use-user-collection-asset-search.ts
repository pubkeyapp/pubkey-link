import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type UserCollectionFindManyAssetProps = {
  search?: string
}

export function useUserCollectionAssetSearch(props?: UserCollectionFindManyAssetProps) {
  const sdk = useSdk()
  const [search, setSearch] = useState<string>(props?.search ?? '')

  console.log('search', search)

  // TODO: add sdk function once implemented
  const query = useQuery({
    queryKey: ['user', 'collection', 'find-many-asset', search],
    // queryFn: () => sdk.userCollectionFindManyAsset({ search }).then((res) => res.data),
  })
  //   const total = query.data?.paging?.meta?.totalCount ?? 0
  //   const items = query.data?.paging.data ?? []

  return {
    items: [],
    query,
    // pagination: {
    //   page,
    //   setPage,
    //   limit,
    //   setLimit,
    //   total,
    // },
    setSearch,
  }
}
