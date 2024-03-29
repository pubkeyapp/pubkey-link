import { ActionIcon, Badge, Group, Text, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Identity, IdentityProvider, UserUpdateIdentityInput } from '@pubkey-link/sdk'
import { IdentityUiAvatar } from '@pubkey-link/web-core-ui'
import { UiCard, UiCopy, UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { IdentityUiLink } from './identity-ui-link'
import { IdentityUiSolanaVerifyButton } from './identity-ui-solana-verify-button'
import { IdentityUiUpdateForm } from './identity-ui-update-form'
import { IdentityUiVerified } from './identity-ui-verified'

export function IdentityUiListItem({
  deleteIdentity,
  updateIdentity,
  refresh,
  item,
}: {
  refresh?: () => void
  deleteIdentity: (id: string) => Promise<void>
  updateIdentity: (id: string, input: UserUpdateIdentityInput) => Promise<void>
  item: Identity
}) {
  function renameIdentity() {
    modals.open({
      title: 'Rename identity',
      children: (
        <IdentityUiUpdateForm
          item={item}
          onSubmit={(res) => updateIdentity(item.id, res).then(() => modals.closeAll())}
        />
      ),
    })
  }

  return (
    <UiCard>
      <Group justify="space-between">
        <Group>
          <IdentityUiAvatar item={item} />
          <UiStack gap={0} align="start">
            <UiGroup gap="xs" align="center">
              <Text size="lg" display="flex">
                {item.name}
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
          {item.verified && item.provider !== IdentityProvider.Discord && (
            <Tooltip label="Delete identity">
              <ActionIcon size="sm" color="red" variant="light" onClick={() => deleteIdentity(item.id)}>
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          )}
          {item.verified && item.provider !== IdentityProvider.Discord && (
            <Tooltip label="Rename identity">
              <ActionIcon size="sm" color="brand" variant="light" onClick={() => renameIdentity()}>
                <IconPencil size={16} />
              </ActionIcon>
            </Tooltip>
          )}
          <UiDebugModal data={item} />
          <IdentityUiLink item={item} />
        </Group>
      </Group>
    </UiCard>
  )
}
