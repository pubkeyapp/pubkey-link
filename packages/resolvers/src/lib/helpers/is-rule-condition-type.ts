import { RuleConditionType } from '../types/rule-condition-type'
import { ruleConditionTypes } from '../types/rule-condition-types'

export function isRuleConditionType(type: RuleConditionType | string): type is RuleConditionType {
  return ruleConditionTypes.includes(type as RuleConditionType)
}
