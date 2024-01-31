import { Accordion, Button, Group, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Community, NetworkToken, Rule } from '@pubkey-link/sdk'

import { RuleConditionUiCreateWizard, RuleConditionUiItem, RuleConditionUiPanel } from '@pubkey-link/web-rule-ui'
import { UiAnchor, UiInfo, UiStack } from '@pubkey-ui/core'
import { IconPlus } from '@tabler/icons-react'

export function UserRuleConditionListFeature(props: { rule: Rule; community: Community; tokens: NetworkToken[] }) {
  const conditions = props.rule.conditions ?? []
  return (
    <UiStack>
      <UiInfo
        title="Rule Conditions"
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
              <RuleConditionUiItem type={condition.type} />
            </Accordion.Control>
            <Accordion.Panel>
              <RuleConditionUiPanel condition={condition} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </UiStack>
  )
}
function AddConditionButton(props: { rule: Rule; community: Community; tokens: NetworkToken[] }) {
  return (
    <Button
      size="xs"
      variant="light"
      leftSection={<IconPlus size={28} />}
      onClick={() =>
        modals.open({
          title: 'Add Condition',
          size: 'xl',
          children: <RuleConditionUiCreateWizard {...props} />,
        })
      }
    >
      Add Condition
    </Button>
  )
}
