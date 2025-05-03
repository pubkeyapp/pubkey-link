import { Text } from '@mantine/core'
import { useUserCollectionAssetFindOne } from '@pubkey-link/web-collection-data-access'
import { UiDebug, UiLoader, UiStack } from '@pubkey-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'

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
