import { ActionIcon, Badge, Group, Menu, Text } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkey-link/sdk'
import { IdentityUiAvatar } from '@pubkey-link/web-ui-core'
import { UiCard, UiCopy, UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'
import { IdentityUiLink } from './identity-ui-link'
import { IdentityUiSolanaVerifyButton } from './identity-ui-solana-verify-button'
import { IdentityUiVerified } from './identity-ui-verified'

export function IdentityUiListItem({
  deleteIdentity,
  refresh,
  item,
}: {
  refresh?: () => void
  deleteIdentity?: (id: string) => void
  item: Identity
}) {
  const name = item.name ?? item.profile?.username ?? item.providerId
  return (
    <UiCard>
      <Group justify="space-between">
        <Group>
          <IdentityUiAvatar item={item} />
          <UiStack gap={0} align="start">
            <UiGroup gap="xs" align="center">
              <Text size="lg" display="flex">
                {name}
              </Text>
              {item.verified ? (
                <IdentityUiVerified item={item} />
              ) : refresh ? (
                <IdentityUiSolanaVerifyButton identity={item} refresh={refresh} />
              ) : (
                <Badge variant="light" color="yellow">
                  Not verified
                </Badge>
              )}
            </UiGroup>

            <UiGroup gap={4} align="center">
              <UiCopy text={item.providerId} />
              <Text c="dimmed" size="xs">
                {item.providerId}
              </Text>
            </UiGroup>
          </UiStack>
        </Group>
        <Group gap="xs">
          <UiDebugModal data={item} />
          <IdentityUiLink item={item} />
          {deleteIdentity && (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="light" size="sm">
                  <IconDotsVertical size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  disabled={item.provider === IdentityProvider.Discord}
                  color="red"
                  leftSection={<IconTrash size={14} />}
                  onClick={() => deleteIdentity(item.id)}
                >
                  Remove this identity
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Group>
    </UiCard>
  )
}
