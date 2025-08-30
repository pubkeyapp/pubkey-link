import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs'
import { UserCollectionAssetFindManyInput } from '@pubkey-link/sdk'

export function useUserCollectionAssetFindMany(props: { collectionId: string }) {
  const sdk = useSdk()

  const [search] = useQueryState('search', parseAsString.withDefault(''))
  const [attributeFilters] = useQueryState('filters', parseAsArrayOf(parseAsString).withDefault([]))
  const [searchByOwnerWallet] = useQueryState('owner', parseAsString.withDefault(''))

  const input: UserCollectionAssetFindManyInput = {
    collectionId: props.collectionId,
    search,
    searchByOwnerWallet,
  }
  const query = useQuery({
    queryKey: ['user', 'collection', 'find-many-asset', input],
    queryFn: () => sdk.userCollectionAssetFindMany({ input }).then((res) => res.data.items ?? []),
  })

  const filteredItems = useMemo(() => {
    const allItems = query.data ?? []

    if (attributeFilters.length === 0) {
      return allItems
    }

    const filtersByKey = attributeFilters.reduce((acc, filter) => {
      const [key, value] = filter.split(':')
      if (!acc[key]) acc[key] = []
      acc[key].push(value)
      return acc
    }, {} as Record<string, string[]>)

    return allItems.filter((asset) => {
      return Object.entries(filtersByKey).every(([key, values]) => {
        return asset.attributes?.some((attr) => attr.key === key && values.includes(attr.value ?? ''))
      })
    })
  }, [query.data, attributeFilters])

  return {
    items: filteredItems,
    query,
  }
}
