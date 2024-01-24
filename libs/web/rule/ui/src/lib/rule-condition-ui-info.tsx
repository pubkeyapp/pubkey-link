import { RuleConditionType } from '@pubkey-link/sdk'
import { UiInfo, UiStack, UiWarning } from '@pubkey-ui/core'

import { RuleConditionUiTypeTitle } from './rule-condition-ui-type-title'

export function RuleConditionUiInfo({ type }: { type: RuleConditionType }) {
  switch (type) {
    case RuleConditionType.AnybodiesAsset:
      return (
        <UiInfo
          bg="inherit"
          title={<RuleConditionUiTypeTitle type={type} />}
          message={<UiStack>This condition validates asset ownership with Anybodies.</UiStack>}
        />
      )
    case RuleConditionType.SolanaNonFungibleAsset:
      return (
        <UiInfo
          bg="inherit"
          title={<RuleConditionUiTypeTitle type={type} />}
          message={<UiStack>This condition validates non-fungible asset ownership on Solana.</UiStack>}
        />
      )
    case RuleConditionType.SolanaFungibleAsset:
      return (
        <UiInfo
          bg="inherit"
          title={<RuleConditionUiTypeTitle type={type} />}
          message={<UiStack>This condition validates fungible asset ownership on Solana.</UiStack>}
        />
      )
    default:
      return <UiWarning message={`Unknown condition type: ${type}`} />
  }
}
