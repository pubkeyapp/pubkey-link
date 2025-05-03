import { Group, SimpleGrid, Slider, Stack } from '@mantine/core'
import { CollectionAsset } from '@pubkey-link/sdk'
import React from 'react'

import { CollectionUiAssetGridItem } from './collection-ui-asset-grid-item'

export function CollectionUiAssetGrid({ assets }: { assets: CollectionAsset[] }) {
  const marks = Array.from({ length: 5 }, (_, index) => ({
    value: index * 4,
    label: `${index + 1}`,
  }))
  const [cols, setCols] = React.useState(marks[2].value)

  return (
    <Stack>
      <Group justify="flex-end">
        <Slider
          w={200}
          defaultValue={cols}
          step={4}
          max={marks[marks.length - 1].value}
          min={marks[0].value}
          marks={marks}
          styles={{ markLabel: { display: 'none' } }}
          value={cols}
          onChange={(val) => setCols(val)}
        />
      </Group>
      <SimpleGrid cols={cols} spacing="xs">
        {assets.map((asset) => (
          <CollectionUiAssetGridItem key={asset.id} asset={asset} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
