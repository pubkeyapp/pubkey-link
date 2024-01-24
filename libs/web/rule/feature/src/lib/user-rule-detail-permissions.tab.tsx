import { UiAnchor, UiCard, UiDebug, UiStack, UiWarning } from '@pubkey-ui/core'
import { IdentityProvider, Rule } from '@pubkey-link/sdk'
import { Button, SimpleGrid, Text } from '@mantine/core'
import { IdentityUiProviderTag } from '@pubkey-link/web-identity-ui'
import { IconPlus } from '@tabler/icons-react'
import { modals } from '@mantine/modals'
import { UiDiscordServerItem } from '@pubkey-link/web-ui-core'

export function UserRuleDetailPermissionsTab({ rule }: { rule: Rule }) {
  if (!rule.conditions?.length) {
    return <UiWarning message="Rule needs at least one condition." />
  }

  return rule.permissions?.length ? (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      <UiCard>
        <UiStack my="lg" align="center" justify="start" h="100%">
          <IdentityUiProviderTag provider={IdentityProvider.Discord} />
          <Text size="sm" c="dimmed" span>
            Permissions will be granted once these <UiAnchor to={'../conditions'}>conditions</UiAnchor> are met.
          </Text>
          <AddPermissionButton rule={rule} />
        </UiStack>
      </UiCard>
      {rule.permissions.map((permission) => (
        <UiCard key={permission.id}>
          <UiStack my="lg" align="center">
            <IdentityUiProviderTag provider={IdentityProvider.Discord} />
            <Text size="sm" c="dimmed" ta="center">
              Get the <strong>{permission.bot?.role?.name}</strong> role in the{' '}
              <strong>{permission.bot?.server?.name}</strong> Discord server.
            </Text>
            <UiDiscordServerItem server={permission.bot?.server} role={permission.bot?.role} />
          </UiStack>
        </UiCard>
      ))}
    </SimpleGrid>
  ) : (
    <UiWarning message="No permissions found." />
  )
}

function AddPermissionButton({ rule }: { rule: Rule }) {
  const { permissions } = rule
  return (
    <Button
      size="lg"
      variant="light"
      leftSection={<IconPlus size={28} />}
      onClick={() =>
        modals.open({
          title: 'Add Permission',
          children: (
            <UiStack>
              <UiDebug data={permissions} open />
            </UiStack>
          ),
        })
      }
    >
      Add Permission
    </Button>
  )
}
