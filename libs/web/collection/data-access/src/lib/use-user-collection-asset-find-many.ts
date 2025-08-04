import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { UserCollectionAssetFindManyInput, UserCollectionFindManyInput } from '@pubkey-link/sdk'

export function useUserCollectionAssetFindMany(props: { collectionId: string; search?: string }) {
  const sdk = useSdk()
  const [search, setSearch] = useState<string>(props?.search ?? '')

  console.log('search', search)

  const input: UserCollectionAssetFindManyInput = {
    collectionId: props.collectionId,
    search,
  }
  const query = useQuery({
    queryKey: ['user', 'collection', 'find-many-asset', input],
    queryFn: () => sdk.userCollectionAssetFindMany({ input }).then((res) => res.data.items ?? []),
  })

  return {
    items: query.data ?? [],
    query,
    setSearch: (q: string) => {
      setSearch(q)
    },
  }
}
