import { Box, Flex, Grid } from '@mantine/core'
import {
  useUserCollectionAssetFindMany,
  useUserCollectionFindMany,
  useUserCollectionFindOne,
} from '@pubkey-link/web-collection-data-access'
import { CollectionUiAssetGrid, CollectionUiAssetSearch, CollectionUiSelect } from '@pubkey-link/web-collection-ui'
import { UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconImageInPicture } from '@tabler/icons-react'
import { useNavigate, useParams } from 'react-router-dom'
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

  const { data: collections } = useUserCollectionFindMany({ communityId })
  const { items: assets, setSearch } = useUserCollectionAssetFindMany({ collectionId: collection.id })

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
          <CollectionUiAssetSearch setSearch={setSearch} />
        </Box>
      </Flex>

      <Grid>
        <Grid.Col span={3}>
          <CollectionUiAttributeTree attributes={collection?.attributes ?? []} />
        </Grid.Col>
        <Grid.Col span={9}>
          {assets?.length ? <CollectionUiAssetGrid assets={assets} /> : <div>No assets found</div>}
        </Grid.Col>
      </Grid>
    </UiPage>
  )
}
