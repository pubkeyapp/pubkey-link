import { Stack } from '@mantine/core'
import { CollectionAsset } from '@pubkey-link/sdk'
import { useMemo, useState, useEffect } from 'react'
import { Grid, CellComponentProps } from 'react-window'

import { CollectionUiAssetGridItem } from './collection-ui-asset-grid-item'

interface GridItemData {
  assets: CollectionAsset[]
  cols: number
}

function GridItem({ columnIndex, rowIndex, style, ...cellProps }: CellComponentProps<GridItemData>) {
  const { assets, cols } = cellProps
  const index = rowIndex * cols + columnIndex
  const asset = assets[index]

  if (!asset) return null

  return (
    <div style={{ ...style, padding: '4px' }}>
      <CollectionUiAssetGridItem asset={asset} cols={cols} />
    </div>
  )
}

export function CollectionUiAssetGrid({ assets, cols = 4 }: { assets: CollectionAsset[]; cols?: number }) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function handleResize() {
      const container = document.getElementById('asset-grid-container')
      if (container) {
        const availableHeight = window.innerHeight - container.getBoundingClientRect().top - 60 // bottom margin
        setContainerSize({
          width: container.clientWidth,
          height: Math.max(availableHeight, 400),
        })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const cellProps = useMemo(() => ({ assets, cols }), [assets, cols])

  const rowCount = Math.ceil(assets.length / cols)
  const itemWidth = containerSize.width / cols - 8
  const itemHeight = itemWidth + 60

  if (containerSize.width === 0) {
    return <div id="asset-grid-container" style={{ width: '100%', height: '100%' }} />
  }

  return (
    <Stack style={{ height: '100%' }}>
      <div id="asset-grid-container" style={{ width: '100%', height: containerSize.height }}>
        <Grid
          cellComponent={GridItem}
          cellProps={cellProps}
          columnCount={cols}
          columnWidth={itemWidth}
          rowCount={rowCount}
          rowHeight={itemHeight}
          style={{ height: containerSize.height, width: containerSize.width }}
        />
      </div>
    </Stack>
  )
}
