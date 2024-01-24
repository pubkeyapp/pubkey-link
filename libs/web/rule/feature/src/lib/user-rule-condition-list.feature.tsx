import { RuleCondition } from '@pubkey-link/sdk'
import { UiAnchor, UiCard, UiGroup, UiInfo, UiStack } from '@pubkey-ui/core'

import { RuleConditionUiItem, RuleConditionUiPanel } from '@pubkey-link/web-rule-ui'
import { Text } from '@mantine/core'

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
      {conditions.map((condition) => (
        <UiCard
          key={condition.id}
          title={
            <UiGroup>
              <RuleConditionUiItem condition={condition} />
            </UiGroup>
          }
        >
          <RuleConditionUiPanel condition={condition} />
        </UiCard>
      ))}
    </UiStack>
  )
}
