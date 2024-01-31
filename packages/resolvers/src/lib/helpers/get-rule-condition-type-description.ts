import { RuleConditionType } from '../types/rule-condition-type'

export function getRuleConditionTypeDescription(type: RuleConditionType) {
  switch (type) {
    case RuleConditionType.AnybodiesAsset:
      return 'This condition validates asset ownership with Anybodies.'
    case RuleConditionType.SolanaNonFungibleAsset:
      return 'This condition validates non-fungible asset ownership on Solana.'
    case RuleConditionType.SolanaFungibleAsset:
      return 'This condition validates fungible asset ownership on Solana.'
    default:
      return `Unknown condition type: ${type}`
  }
}
