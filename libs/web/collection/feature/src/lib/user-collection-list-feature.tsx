import { Button } from '@mantine/core'
import { useUserCollectionFindMany } from '@pubkey-link/web-collection-data-access'
import { CollectionUiGrid } from '@pubkey-link/web-collection-ui'
import { useUserFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconImageInPicture } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'

export function UserCollectionListFeature({ communityId }: { communityId: string }) {
  const { data, isLoading } = useUserCollectionFindMany({ communityId })
  const { item, isAdmin } = useUserFindOneCommunity({ communityId })

  return (
    <UiPage
      title="Collections"
      leftAction={<IconImageInPicture />}
      rightAction={
        isAdmin ? (
          <Button size="xs" variant="light" component={Link} to={`${item?.viewUrl}/collections/manage`}>
            Manage
          </Button>
        ) : undefined
      }
    >
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
