import { Box, Grid } from '@mantine/core'
import { useUserCollectionFindMany, useUserCollectionFindOne } from '@pubkey-link/web-collection-data-access'
import { CollectionUiAssetGrid, CollectionUiSelect } from '@pubkey-link/web-collection-ui'
import { UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconImageInPicture } from '@tabler/icons-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CollectionUiAttributeTree } from './collection-ui-attribute-tree'

export function UserCollectionDetailFeature() {
  const { collectionId, communityId } = useParams() as { collectionId: string; communityId: string }
  const { data, isLoading } = useUserCollectionFindOne({ collectionId })
  const { data: collections } = useUserCollectionFindMany({ communityId })
  const navigate = useNavigate()

  if (isLoading) {
    return <UiLoader />
  }

  if (!data) {
    return <UiError message="Collection not found." />
  }

  return (
    <UiPage title={`Collection ${data?.name} `} leftAction={<IconImageInPicture />}>
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
