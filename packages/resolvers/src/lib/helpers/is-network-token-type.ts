import { NetworkTokenType } from '../types/network-token-type'
import { ruleConditionTypes } from '../types/rule-condition-types'

export function isNetworkTokenType(type: NetworkTokenType | string): type is NetworkTokenType {
  return ruleConditionTypes.includes(type as NetworkTokenType)
}
