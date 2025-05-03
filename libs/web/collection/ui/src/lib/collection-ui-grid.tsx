import { SimpleGrid } from '@mantine/core'
import { Collection } from '@pubkey-link/sdk'
import React from 'react'
import { CollectionUiGridItem } from './collection-ui-grid-item'

export function CollectionUiGrid({ items }: { items: Collection[] }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
      {items.map((item) => (
        <CollectionUiGridItem key={item.id} item={item} />
      ))}
    </SimpleGrid>
  )
}
