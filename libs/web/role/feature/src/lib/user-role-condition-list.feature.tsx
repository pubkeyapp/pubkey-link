import { Accordion, Button, Group, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Community, NetworkToken, Role } from '@pubkey-link/sdk'

import { RoleConditionUiCreateWizard, RoleConditionUiItem, RoleConditionUiPanel } from '@pubkey-link/web-role-ui'
import { UiAnchor, UiInfo, UiStack } from '@pubkey-ui/core'
import { IconPlus } from '@tabler/icons-react'

export function UserRoleConditionListFeature(props: { role: Role; community: Community; tokens: NetworkToken[] }) {
  const conditions = props.role.conditions ?? []
  return (
    <UiStack>
      <UiInfo
        title="Role Conditions"
        message={
          <Group justify="space-between">
            <Text size="sm">
              The following conditions must be satisfied to receive{' '}
              <UiAnchor to={'../permissions'}>these permissions</UiAnchor>.
            </Text>
            <AddConditionButton {...props} />
          </Group>
        }
      />
      <Accordion multiple variant="separated">
        {conditions?.map((condition) => (
          <Accordion.Item key={condition.id} value={condition.id}>
            <Accordion.Control>
              <RoleConditionUiItem type={condition.type} />
            </Accordion.Control>
            <Accordion.Panel>
              <RoleConditionUiPanel condition={condition} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </UiStack>
  )
}
function AddConditionButton(props: { role: Role; community: Community; tokens: NetworkToken[] }) {
  return (
    <Button
      size="xs"
      variant="light"
      leftSection={<IconPlus size={28} />}
      onClick={() =>
        modals.open({
          title: 'Add Condition',
          size: 'xl',
          children: <RoleConditionUiCreateWizard {...props} />,
        })
      }
    >
      Add Condition
    </Button>
  )
}
