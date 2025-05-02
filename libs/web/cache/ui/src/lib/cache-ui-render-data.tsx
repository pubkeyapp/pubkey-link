import { useAdminCacheDetail } from '@pubkey-link/web-cache-data-access'
import React from 'react'
import { CacheUiRenderDataCollectionAssets } from './cache-ui-render-data-collection-assets'
import { CacheUiRenderDataTokenAccounts } from './cache-ui-render-data-token-accounts'

export function CacheUiRenderData({ data }: { data: ReturnType<typeof useAdminCacheDetail>['data'] }) {
  switch (data?.type) {
    case 'helius-collection-assets':
      return <CacheUiRenderDataCollectionAssets data={data} />
    case 'helius-token-accounts':
      return <CacheUiRenderDataTokenAccounts data={data} />
    default:
      return <div>Error loading cache</div>
  }
}
