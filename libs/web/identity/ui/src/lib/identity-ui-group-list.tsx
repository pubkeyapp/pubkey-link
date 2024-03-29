import { Group, Text } from '@mantine/core'
import { Identity, IdentityProvider, UserUpdateIdentityInput } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { IdentityUiIcon } from './identity-ui-icon'
import { IdentityUiList } from './identity-ui-list'

export function IdentityUiGroupList({
  updateIdentity,
  deleteIdentity,
  refresh,
  grouped,
}: {
  deleteIdentity: (id: string) => Promise<void>
  updateIdentity: (id: string, input: UserUpdateIdentityInput) => Promise<void>
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
          </Group>
          {group.items?.length ? (
            <IdentityUiList
              items={group.items}
              refresh={refresh}
              deleteIdentity={deleteIdentity}
              updateIdentity={updateIdentity}
            />
          ) : null}
        </UiStack>
      ))}
    </UiStack>
  )
}
