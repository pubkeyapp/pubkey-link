import { Group, SimpleGrid, Slider, Stack } from '@mantine/core'
import { DAS } from 'helius-sdk'
import React from 'react'

import { CacheUiAssetGridItem } from './cache-ui-asset-grid-item'

export function CacheUiAssetGrid({ items }: { items: DAS.GetAssetResponse[] }) {
  const marks = Array.from({ length: 11 }, (_, index) => ({
    value: index * 4,
    label: `${index + 1}`,
  }))
  const [cols, setCols] = React.useState(marks[1].value)

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
        {items.map((item: DAS.GetAssetResponse) => (
          <CacheUiAssetGridItem key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
