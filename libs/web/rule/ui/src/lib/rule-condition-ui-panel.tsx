import { RuleCondition } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'

import { RuleConditionUiSettings } from './rule-condition-ui-settings'

export function RuleConditionUiPanel({ condition }: { condition: RuleCondition }) {
  return (
    <UiStack>
      <RuleConditionUiSettings condition={condition} />
    </UiStack>
  )
}
