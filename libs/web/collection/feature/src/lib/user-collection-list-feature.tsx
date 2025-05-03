import { Text } from '@mantine/core'
import { useUserCollectionAssetFindOne, useUserCollectionFindMany } from '@pubkey-link/web-collection-data-access'
import { CollectionUiGrid } from '@pubkey-link/web-collection-ui'
import { UiDebug, UiInfo, UiLoader, UiPage, UiStack } from '@pubkey-ui/core'
import { IconImageInPicture } from '@tabler/icons-react'
import React from 'react'
import { useParams } from 'react-router-dom'

export function UserCollectionListFeature() {
  const { data, isLoading } = useUserCollectionFindMany()

  return (
    <UiPage title="Collections" leftAction={<IconImageInPicture />}>
      {isLoading ? (
        <UiLoader />
      ) : data?.length ? (
        <CollectionUiGrid items={data} />
      ) : (
        <UiInfo message="No featured collections found" />
      )}
    </UiPage>
  )
}

export function UserCollectionAssetFeature() {
  const { assetId, collectionId } = useParams() as { assetId: string; collectionId: string }
  const { data, isLoading } = useUserCollectionAssetFindOne({ assetId, collectionId })

  if (isLoading) {
    return <UiLoader />
  }

  return (
    <UiStack>
      <Text>Collection Detail: {'data?.name'}</Text>
      <UiDebug data={data} />
    </UiStack>
  )
}
