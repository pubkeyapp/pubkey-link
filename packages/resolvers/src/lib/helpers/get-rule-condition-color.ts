import { RuleConditionType } from '../types/rule-condition-type'

export function getRuleConditionColor(type?: RuleConditionType | null): string | undefined {
  switch (type) {
    case RuleConditionType.SolanaNonFungibleAsset:
    case RuleConditionType.SolanaFungibleAsset:
      return 'violet'
    case RuleConditionType.AnybodiesAsset:
      return 'yellow'
    default:
      return undefined
  }
}
