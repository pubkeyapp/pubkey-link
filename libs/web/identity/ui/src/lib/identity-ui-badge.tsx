import { Group, Text } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { IdentityUiIcon } from './identity-ui-icon'

export function IdentityUiBadge({ provider }: { provider: IdentityProvider }) {
  return (
    <Group gap={2}>
      <Text c="dimmed" display="flex">
        <IdentityUiIcon size={16} provider={provider} />
      </Text>
      <Text size="sm" c="dimmed">
        {provider}
      </Text>
    </Group>
  )
}
