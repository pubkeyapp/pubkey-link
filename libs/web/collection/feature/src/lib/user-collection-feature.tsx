import { CollectionUiLayout } from '@pubkey-link/web-collection-ui'
import React from 'react'
import { useRoutes } from 'react-router-dom'
import { UserCollectionDetailFeature } from './user-collection-detail-feature'
import { UserCollectionAssetFeature, UserCollectionListFeature } from './user-collection-list-feature'

export default function UserCollectionFeature() {
  const routes = useRoutes([
    {
      index: true,
      element: <UserCollectionListFeature />,
    },
    { path: ':collectionId', element: <UserCollectionDetailFeature /> },
    { path: ':collectionId/:assetId', element: <UserCollectionAssetFeature /> },
  ])
  return <CollectionUiLayout>{routes}</CollectionUiLayout>
}
