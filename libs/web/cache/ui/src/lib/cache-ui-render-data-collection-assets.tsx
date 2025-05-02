import { useAdminCacheDetail } from '@pubkey-link/web-cache-data-access'
import { UiDebug, UiStack } from '@pubkey-ui/core'
import React from 'react'
import { CacheUiAssetGrid } from './cache-ui-asset-grid'

export function CacheUiRenderDataCollectionAssets({ data }: { data: ReturnType<typeof useAdminCacheDetail>['data'] }) {
  const items = data?.items ?? []

  return (
    <UiStack>
      <UiDebug data={{ ...data, items: undefined }} />
      <CacheUiAssetGrid items={items} />
    </UiStack>
  )
}
