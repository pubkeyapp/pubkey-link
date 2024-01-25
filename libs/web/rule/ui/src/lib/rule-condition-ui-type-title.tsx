import { RuleConditionType } from '@pubkey-link/sdk'
import { IconCurrencySolana } from '@tabler/icons-react'
import { ComponentType } from 'react'

export function RuleConditionUiTypeTitle({ type }: { type: RuleConditionType }) {
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

export function getRuleConditionIconType(
  type?: RuleConditionType | null,
): ComponentType<{ color?: string; size: number }> | undefined {
  switch (type) {
    case RuleConditionType.SolanaNonFungibleAsset:
    case RuleConditionType.SolanaFungibleAsset:
      return IconCurrencySolana
    default:
      return undefined
  }
}

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
