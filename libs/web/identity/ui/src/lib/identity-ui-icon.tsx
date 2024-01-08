import { Group, Text } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTwitter,
  IconCurrencySolana,
  IconQuestionMark,
} from '@tabler/icons-react'

export function IdentityUiIcon({ provider, size }: { provider: IdentityProvider; size?: number }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscord size={size} />
    case IdentityProvider.GitHub:
      return <IconBrandGithub size={size} />
    case IdentityProvider.Solana:
      return <IconCurrencySolana size={size} />
    case IdentityProvider.Twitter:
      return <IconBrandTwitter size={size} />
    default:
      return <IconQuestionMark size={size} />
  }
}

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
