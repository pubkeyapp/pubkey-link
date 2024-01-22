import { Group, Text } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { IdentityUiIcon } from './identity-ui-icon'

import { IdentityUiLinkButton } from './identity-ui-link-button'
import { IdentityUiList } from './identity-ui-list'

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
            <IdentityUiLinkButton
              identities={group.items}
              refresh={refresh}
              provider={group.provider}
              size="sm"
              w={210}
            />
          </Group>
          {group.items?.length ? (
            <IdentityUiList items={group.items} refresh={refresh} deleteIdentity={deleteIdentity} />
          ) : null}
        </UiStack>
      ))}
    </UiStack>
  )
}
