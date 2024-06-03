import { Badge, Button, Collapse, Group, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  AppFeature,
  Identity,
  UserAddIdentityGrantInput,
  UserRemoveIdentityGrantInput,
  UserUpdateIdentityInput,
} from '@pubkey-link/sdk'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { IdentityUiAvatar } from '@pubkey-link/web-core-ui'
import { UiCard, UiCopy, UiGroup, UiStack } from '@pubkey-ui/core'
import { IdentityGrantUiManager } from './identity-grant-ui-manager'
import { IdentityUiListActions } from './identity-ui-list-actions'
import { IdentityUiSolanaVerifyButton } from './identity-ui-solana-verify-button'
import { IdentityUiVerified } from './identity-ui-verified'

export function IdentityUiListItem({
  deleteIdentity,
  updateIdentity,
  addIdentityGrant,
  removeIdentityGrant,
  refresh,
  item,
}: {
  refresh?: () => void
  deleteIdentity: (id: string) => Promise<void>
  updateIdentity: (id: string, input: UserUpdateIdentityInput) => Promise<void>
  addIdentityGrant?: (input: UserAddIdentityGrantInput) => Promise<void>
  removeIdentityGrant?: (input: UserRemoveIdentityGrantInput) => Promise<void>
  item: Identity
}) {
  const { hasFeature } = useAppConfig()
  const hasIdentityGrants = hasFeature(AppFeature.IdentityGrants) && addIdentityGrant && removeIdentityGrant
  const [showIdentityGrants, { toggle }] = useDisclosure(false)

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
        <IdentityUiListActions
          identity={item}
          deleteIdentity={deleteIdentity}
          updateIdentity={updateIdentity}
          addIdentityGrant={addIdentityGrant}
          removeIdentityGrant={removeIdentityGrant}
        />
      </Group>
      {hasIdentityGrants ? (
        <UiStack>
          <Group justify="flex-end">
            <Button onClick={toggle} size="xs" variant="light">
              Manage Identity Grants
            </Button>
          </Group>
          <Collapse in={showIdentityGrants} transitionTimingFunction="linear">
            <IdentityGrantUiManager item={item} addGrant={addIdentityGrant} removeGrant={removeIdentityGrant} />
          </Collapse>
        </UiStack>
      ) : null}
    </UiCard>
  )
}
