import { Group, Text } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { IdentityUiIcon } from './identity-ui-icon'
import { IdentityUiLinkButton } from './identity-ui-link-button'

export function IdentityUiLinkList({ refresh, providers }: { refresh?: () => void; providers: IdentityProvider[] }) {
  return (
    <UiStack gap="lg">
      {providers.map((provider) => (
        <UiStack key={provider}>
          <Group justify="space-between">
            <Group pl="lg">
              <IdentityUiIcon provider={provider} />
              <Text size="xl">{provider}</Text>
            </Group>
            <IdentityUiLinkButton identities={[]} refresh={refresh} provider={provider} size="sm" w={210} />
          </Group>
        </UiStack>
      ))}
    </UiStack>
  )
}
