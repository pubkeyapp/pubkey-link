import { RuleConditionType } from '@pubkey-link/sdk'
import { UiAlertProps, UiInfo, UiWarning } from '@pubkey-ui/core'

import { getRuleConditionTypeDescription, RuleConditionUiTypeTitle } from './rule-condition-ui-type-title'

export function RuleConditionUiInfo({ type, ...props }: Omit<UiAlertProps, 'message'> & { type: RuleConditionType }) {
  if (
    [
      RuleConditionType.AnybodiesAsset,
      RuleConditionType.SolanaNonFungibleAsset,
      RuleConditionType.SolanaFungibleAsset,
    ].includes(type)
  ) {
    return (
      <UiInfo
        title={<RuleConditionUiTypeTitle type={type} />}
        message={getRuleConditionTypeDescription(type)}
        {...props}
      />
    )
  }

  return <UiWarning message={`Unknown condition type: ${type}`} />
}
