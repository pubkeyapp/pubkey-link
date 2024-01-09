import { Group, Text, TextProps } from '@mantine/core'
import { App } from '@pubkey-link/sdk'
import { UiAnchor } from '@pubkey-ui/core'
import { AppUiAvatar } from './app-ui-avatar'

export function AppUiLabel({ app, to, ...props }: TextProps & { app: App; to?: string }) {
  return (
    <Group gap="sm" p={4}>
      <UiAnchor to={to} underline="never">
        <AppUiAvatar size="sm" app={app} />
      </UiAnchor>
      <Text {...props} size="lg" fw={500}>
        <UiAnchor underline="never" to={to}>
          {app.name}
        </UiAnchor>
      </Text>
    </Group>
  )
}
