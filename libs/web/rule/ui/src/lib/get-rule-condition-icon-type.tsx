import { RuleConditionType } from '@pubkey-link/sdk'
import { IconCurrencySolana } from '@tabler/icons-react'
import { ComponentType } from 'react'

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
