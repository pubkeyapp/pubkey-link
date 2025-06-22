import { Box, Flex, Grid } from '@mantine/core'
import {
  useUserCollectionAssetSearch,
  useUserCollectionFindMany,
  useUserCollectionFindOne,
} from '@pubkey-link/web-collection-data-access'
import { CollectionUiAssetGrid, CollectionUiAssetSearch, CollectionUiSelect } from '@pubkey-link/web-collection-ui'
import { UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconImageInPicture } from '@tabler/icons-react'
import { useNavigate, useParams } from 'react-router-dom'
import { CollectionUiAttributeTree } from './collection-ui-attribute-tree'

export function UserCollectionDetailFeature() {
  const navigate = useNavigate()
  const { collectionId, communityId } = useParams() as { collectionId: string; communityId: string }

  const { data, isLoading } = useUserCollectionFindOne({ collectionId })
  const { data: collections } = useUserCollectionFindMany({ communityId })

  const { setSearch } = useUserCollectionAssetSearch()

  if (isLoading) {
    return <UiLoader />
  }

  if (!data) {
    return <UiError message="Collection not found." />
  }

  return (
    <UiPage title={`Collection ${data?.name} `} leftAction={<IconImageInPicture />}>
      <Flex gap={34}>
        <Box w={230}>
          {collections && (
            <CollectionUiSelect
              collections={collections?.map((collection) => ({
                value: collection.id,
                label: collection.name,
              }))}
              value={collectionId}
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
          <CollectionUiAttributeTree attributes={data?.attributes ?? []} />
        </Grid.Col>
        <Grid.Col span={9}>
          {data.assets?.length ? <CollectionUiAssetGrid assets={data.assets} /> : <div>No assets found</div>}
        </Grid.Col>
      </Grid>
    </UiPage>
  )
}
