import { Grid } from '@mantine/core'
import type { ReactNode } from 'react'

export function UiGrid({ children, sidebar }: { children: ReactNode; sidebar: ReactNode }) {
  return (
    <Grid>
      <Grid.Col span={{ sm: 4 }}>{sidebar}</Grid.Col>
      <Grid.Col span={{ sm: 8 }}>{children}</Grid.Col>
    </Grid>
  )
}
