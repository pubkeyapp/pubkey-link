import { Grid, rem, SimpleGrid, Skeleton } from '@mantine/core'
import { App } from '@pubkey-link/sdk'
import { UiDebug } from '@pubkey-ui/core'

export function UserAppDetailDashboard({ app }: { app: App }) {
  const PRIMARY_COL_HEIGHT = rem(300)
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
      <Grid gutter="md">
        <Grid.Col span={6}>
          <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
        </Grid.Col>
        <Grid.Col>
          <UiDebug data={app} />
        </Grid.Col>
      </Grid>
    </SimpleGrid>
  )
}
