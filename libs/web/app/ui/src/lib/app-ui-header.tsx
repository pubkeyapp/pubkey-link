import { Group, GroupProps } from '@mantine/core'
import { App } from '@pubkey-link/sdk'
import { UiDebugModal } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { AppUiLabel } from './app-ui-label'

export function AppUiHeader({
  app,
  to,
  leftSection,
  rightSection,
  ...props
}: GroupProps & {
  leftSection?: ReactNode
  rightSection?: ReactNode
  app: App
  to?: string
}) {
  return (
    <Group justify="space-between" align="center" {...props}>
      <Group gap="xs">
        {leftSection}
        <AppUiLabel app={app} to={to} />
      </Group>
      <Group gap="xs">
        <UiDebugModal data={app} />
        {rightSection}
      </Group>
    </Group>
  )
}
