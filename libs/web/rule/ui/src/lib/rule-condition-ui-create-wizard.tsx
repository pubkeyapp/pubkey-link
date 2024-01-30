import { NavLink } from '@mantine/core'
import { Community, getEnumOptions, NetworkToken, Rule, RuleConditionType } from '@pubkey-link/sdk'
import { UiCard, UiDebug, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { RuleConditionUiAvatar } from './rule-condition-ui-item'
import { getRuleConditionTypeDescription, RuleConditionUiTypeTitle } from './rule-condition-ui-type-title'

export function RuleConditionUiCreateWizard({
  rule,
  community,
  tokens,
}: {
  rule: Rule
  community: Community
  tokens: NetworkToken[]
}) {
  const [ruleConditionType, setRuleConditionType] = useState<RuleConditionType | undefined>(undefined)
  const [ruleConditionConfig, setRuleConditionConfig] = useState<Record<string, string> | undefined>(undefined)

  return (
    <UiCard>
      <UiStack>
        <div>Create Condition</div>

        <UiStack>
          {getEnumOptions(RuleConditionType).map((option) => (
            <NavLink
              key={option.value}
              leftSection={<RuleConditionUiAvatar type={option.value} />}
              onClick={() => setRuleConditionType(option.value)}
              label={<RuleConditionUiTypeTitle type={option.value} />}
              variant={'light'}
              active={ruleConditionType === option.value}
              description={getRuleConditionTypeDescription(option.value)}
            />
          ))}
        </UiStack>

        {ruleConditionType ? <RuleConditionUiTypeForm type={ruleConditionType} tokens={[]} /> : null}

        <UiDebug data={{ tokens }} />
      </UiStack>
    </UiCard>
  )
}

export function RuleConditionUiTypeForm({ type, tokens }: { type: RuleConditionType; tokens: NetworkToken[] }) {
  switch (type) {
    case RuleConditionType.AnybodiesAsset:
      return <div>AnybodiesAsset</div>
    case RuleConditionType.SolanaFungibleAsset:
      return <div>SolanaFungibleAsset</div>
    case RuleConditionType.SolanaNonFungibleAsset:
      return <div>SolanaNonFungibleAsset</div>
    default:
      return <div>Unknown</div>
  }
}
