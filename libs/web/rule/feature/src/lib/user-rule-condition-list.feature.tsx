import { Accordion, Text } from '@mantine/core'
import { RuleCondition } from '@pubkey-link/sdk'

import { RuleConditionUiItem, RuleConditionUiPanel } from '@pubkey-link/web-rule-ui'
import { UiAnchor, UiInfo, UiStack } from '@pubkey-ui/core'

export function UserRuleConditionListFeature({ conditions }: { conditions: RuleCondition[] }) {
  return (
    <UiStack>
      <UiInfo
        title="Rule Conditions"
        message={
          <Text size="sm">
            The following conditions must be satisfied to receive{' '}
            <UiAnchor to={'../permissions'}>these permissions</UiAnchor>.
          </Text>
        }
      />
      <Accordion multiple variant="separated">
        {conditions.map((condition) => (
          <Accordion.Item key={condition.id} value={condition.id}>
            <Accordion.Control>
              <RuleConditionUiItem condition={condition} />
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
