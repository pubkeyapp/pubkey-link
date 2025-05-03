import { Box } from '@mantine/core'
import React from 'react'

export function CollectionUiLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box h="100%" style={{ overflow: 'auto' }}>
      {children}
    </Box>
  )
}
