import { Group, Title } from '@mantine/core'
import { ReactNode } from 'react'

export function AuthUiEnabled({ authEnabled, children }: { authEnabled: boolean; children: ReactNode }) {
  return authEnabled ? (
    children
  ) : (
    <Group justify="center">
      <Title>Authentication is disabled.</Title>
    </Group>
  )
}
