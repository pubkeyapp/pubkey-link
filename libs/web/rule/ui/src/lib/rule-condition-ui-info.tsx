import {
  getRuleConditionTypeDescription,
  getRuleConditionTypeTitle,
  isRuleConditionType,
  RuleConditionType,
} from '@pubkey-link/resolvers'

import { UiAlertProps, UiInfo, UiWarning } from '@pubkey-ui/core'

export function RuleConditionUiInfo({ type, ...props }: Omit<UiAlertProps, 'message'> & { type: RuleConditionType }) {
  if (isRuleConditionType(type)) {
    return <UiInfo title={getRuleConditionTypeTitle(type)} message={getRuleConditionTypeDescription(type)} {...props} />
  }

  return <UiWarning message={`Unknown condition type: ${type}`} />
}
