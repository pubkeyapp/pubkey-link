import { Paper } from '@mantine/core'
import { App } from '@pubkey-link/sdk'
import { UiDebug } from '@pubkey-ui/core'
import { AppUiHeader } from './app-ui-header'

export function AppUiCard({ app, to }: { app: App; to?: string }) {
  return (
    <Paper withBorder>
      <AppUiHeader p="md" to={to} app={app} />
      <UiDebug data={app} open hideButton />
    </Paper>
  )
}
