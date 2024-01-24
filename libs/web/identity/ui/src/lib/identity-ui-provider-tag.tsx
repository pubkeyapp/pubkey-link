import { IdentityProvider } from '@pubkey-link/sdk'
import { Group, Text, TextProps } from '@mantine/core'
import { IdentityUiIcon } from './identity-ui-icon'

export function IdentityUiProviderTag({
  provider,
  label,
  ...props
}: TextProps & { label?: string | null; provider: IdentityProvider }) {
  return (
    <Text size="sm" c="dimmed" span {...props}>
      <Group align="center" gap={2}>
        <IdentityUiIcon provider={provider} size={16} /> {label ?? provider}
      </Group>
    </Text>
  )
}
