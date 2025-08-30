import { Box, Button, Flex, Grid, SegmentedControl, Stack } from '@mantine/core'
import {
  useUserCollectionAssetFindMany,
  useUserCollectionFindMany,
  useUserCollectionFindOne,
} from '@pubkey-link/web-collection-data-access'
import {
  CollectionUiAssetGrid,
  CollectionUiAssetSearch,
  CollectionUiOwnerSearch,
  CollectionUiSelect,
} from '@pubkey-link/web-collection-ui'
import { UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconImageInPicture } from '@tabler/icons-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs'
import { CollectionUiAttributeTree } from './collection-ui-attribute-tree'
import { Collection } from '@pubkey-link/sdk'

export function UserCollectionDetailFeature() {
  const { collectionId, communityId } = useParams() as { collectionId: string; communityId: string }

  const { data, isLoading } = useUserCollectionFindOne({ collectionId })

  if (isLoading) {
    return <UiLoader />
  }

  if (!data) {
    return <UiError message="Collection not found." />
  }

  return <UserCollectionDetailLoaded collection={data} communityId={communityId} />
}

export function UserCollectionDetailLoaded({
  collection,
  communityId,
}: {
  collection: Collection
  communityId: string
}) {
  const navigate = useNavigate()
  const [cols, setCols] = useState(4)

  const [selectedFilters, setSelectedFilters] = useQueryState('filters', parseAsArrayOf(parseAsString).withDefault([]))
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''))
  const [ownerSearch, setOwnerSearch] = useQueryState('owner', parseAsString.withDefault(''))

  const { data: collections } = useUserCollectionFindMany({ communityId })
  const { items: assets } = useUserCollectionAssetFindMany({
    collectionId: collection.id,
  })

  const filteredAttributes = useMemo(() => {
    if (!assets || assets.length === 0) return []

    const attributeMap = new Map<string, Map<string, number>>()

    assets.forEach((asset) => {
      asset.attributes?.forEach((attr) => {
        if (!attributeMap.has(attr.key)) {
          attributeMap.set(attr.key, new Map())
        }
        const valueMap = attributeMap.get(attr.key)!
        const currentCount = valueMap.get(attr.value ?? '') || 0
        valueMap.set(attr.value ?? '', currentCount + 1)
      })
    })

    const result: Array<{ key: string; value: string; count: number }> = []

    attributeMap.forEach((valueMap, key) => {
      valueMap.forEach((count, value) => {
        result.push({ key, value, count })
      })
    })

    return result
  }, [assets])

  return (
    <UiPage title={`Collection ${collection?.name} `} leftAction={<IconImageInPicture />}>
      <Flex gap={34}>
        <Box w={230}>
          {collections && (
            <CollectionUiSelect
              collections={collections?.map((collection) => ({
                value: collection.id,
                label: collection.name,
              }))}
              value={collection.id}
              onChange={(value) => {
                navigate(`/c/${communityId}/collections/${value}`)
              }}
            />
          )}
        </Box>

        <Box flex={1}>
          <Flex gap="md" align="center">
            <Box flex={1}>
              <CollectionUiAssetSearch />
            </Box>
            <CollectionUiOwnerSearch />
            <SegmentedControl
              value={cols.toString()}
              onChange={(value) => setCols(parseInt(value))}
              data={[
                { label: '4x', value: '4' },
                { label: '8x', value: '8' },
                { label: '12x', value: '12' },
              ]}
              withItemsBorders={false}
            />
          </Flex>
        </Box>
      </Flex>

      <Grid>
        <Grid.Col span={3}>
          <Stack gap="md">
            {(selectedFilters.length > 0 || search || ownerSearch) && (
              <Button
                variant="light"
                color="gray"
                size="sm"
                fullWidth
                onClick={() => {
                  setSelectedFilters([])
                  setSearch('')
                  setOwnerSearch('')
                }}
              >
                Clear All Filters ({selectedFilters.length + (search ? 1 : 0) + (ownerSearch ? 1 : 0)})
              </Button>
            )}
            <CollectionUiAttributeTree attributes={filteredAttributes} />
          </Stack>
        </Grid.Col>
        <Grid.Col span={9}>
          {assets?.length ? <CollectionUiAssetGrid assets={assets} cols={cols} /> : <div>No assets found</div>}
        </Grid.Col>
      </Grid>
    </UiPage>
  )
}
