import { Grid } from '@mantine/core'
import { useUserCollectionFindOne } from '@pubkey-link/web-collection-data-access'
import { CollectionUiAssetGrid } from '@pubkey-link/web-collection-ui'
import { UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconImageInPicture } from '@tabler/icons-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { CollectionUiAttributeTree } from './collection-ui-attribute-tree'

export function UserCollectionDetailFeature() {
  const { collectionId } = useParams() as { collectionId: string }
  const { data, isLoading } = useUserCollectionFindOne({ collectionId })

  if (isLoading) {
    return <UiLoader />
  }

  if (!data) {
    return <UiError message="Collection not found." />
  }

  return (
    <UiPage title={`Collection ${data?.name} `} leftAction={<IconImageInPicture />}>
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
