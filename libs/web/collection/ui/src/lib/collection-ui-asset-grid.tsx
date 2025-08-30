import { SimpleGrid, Stack } from '@mantine/core'
import { CollectionAsset } from '@pubkey-link/sdk'

import { CollectionUiAssetGridItem } from './collection-ui-asset-grid-item'

export function CollectionUiAssetGrid({ assets, cols = 4 }: { assets: CollectionAsset[]; cols?: number }) {
  return (
    <Stack>
      <SimpleGrid cols={cols} spacing="xs">
        {assets.map((asset) => (
          <CollectionUiAssetGridItem key={asset.id} asset={asset} cols={cols} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
