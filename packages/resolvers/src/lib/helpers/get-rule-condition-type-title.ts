import { RuleConditionType } from '../types/rule-condition-type'

export function getRuleConditionTypeTitle(type?: RuleConditionType | null): string | undefined {
  switch (type) {
    case RuleConditionType.AnybodiesAsset:
      return 'Anybodies Asset'
    case RuleConditionType.SolanaNonFungibleAsset:
      return 'Solana Non-Fungible Asset'
    case RuleConditionType.SolanaFungibleAsset:
      return 'Solana Fungible Asset'
    default:
      return `Unknown condition type: ${type}`
  }
}
