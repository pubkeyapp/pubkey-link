import { CollectionUiLayout } from '@pubkey-link/web-collection-ui'
import React from 'react'
import { useRoutes } from 'react-router-dom'
import { UserCollectionAssetFeature } from './user-collection-asset-feature'
import { UserCollectionDetailFeature } from './user-collection-detail-feature'
import { UserCollectionListFeature } from './user-collection-list-feature'
import { UserCollectionManageFeature } from './user-collection-manage-feature'

export default function UserCollectionFeature({ communityId }: { communityId: string }) {
  const routes = useRoutes([
    {
      index: true,
      element: <UserCollectionListFeature communityId={communityId} />,
    },
    { path: 'manage', element: <UserCollectionManageFeature communityId={communityId} /> },
    { path: ':collectionId', element: <UserCollectionDetailFeature /> },
    { path: ':collectionId/:assetId', element: <UserCollectionAssetFeature /> },
  ])
  return <CollectionUiLayout>{routes}</CollectionUiLayout>
}
