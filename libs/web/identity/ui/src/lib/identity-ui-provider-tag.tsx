import { IdentityProvider } from '@pubkey-link/sdk'
import { Group, Text } from '@mantine/core'
import { IdentityUiIcon } from './identity-ui-icon'

export function IdentityUiProviderTag({ provider }: { provider: IdentityProvider }) {
  return (
    <Text size="sm" c="dimmed" span>
      <Group align="center" gap={2}>
        <IdentityUiIcon provider={provider} size={16} /> {provider}
      </Group>
    </Text>
  )
}
