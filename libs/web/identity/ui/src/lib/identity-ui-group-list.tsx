import { Group, Text } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { IdentityUiDiscordLinkButton } from './identity-ui-discord-link-button'
import { IdentityUiGithubLinkButton, IdentityUiTwitterLinkButton } from './identity-ui-github-link-button'
import { IdentityUiIcon } from './identity-ui-icon'
import { IdentityUiList } from './identity-ui-list'
import { IdentityUiSolanaLinkButton } from './identity-ui-solana-link-button'

export function IdentityUiGroupList({
  deleteIdentity,
  refresh,
  grouped,
}: {
  deleteIdentity?: (id: string) => void
  refresh?: () => void
  grouped: { provider: IdentityProvider; items: Identity[] }[]
}) {
  return (
    <UiStack gap="lg">
      {grouped.map((group) => (
        <UiStack key={group.provider}>
          <Group justify="space-between">
            <Group pl="lg">
              <IdentityUiIcon provider={group.provider} />
              <Text size="xl">{group.provider}</Text>
            </Group>
            {group.provider === IdentityProvider.Discord && <IdentityUiDiscordLinkButton size="sm" w={210} />}
            {group.provider === IdentityProvider.GitHub && <IdentityUiGithubLinkButton size="sm" w={210} />}
            {refresh && group.provider === IdentityProvider.Solana && (
              <IdentityUiSolanaLinkButton identities={group.items ?? []} refresh={refresh} size="sm" w={210} />
            )}
            {group.provider === IdentityProvider.Twitter && <IdentityUiTwitterLinkButton size="sm" w={210} />}
          </Group>
          {group.items?.length ? (
            <IdentityUiList items={group.items} refresh={refresh} deleteIdentity={deleteIdentity} />
          ) : null}
        </UiStack>
      ))}
    </UiStack>
  )
}
