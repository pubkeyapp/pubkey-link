import { Community, Rule } from '@pubkey-link/sdk'
import { useAdminFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { RuleConditionUiCreateWizard } from '@pubkey-link/web-rule-ui'
import { UserRuleConditionListFeature } from './user-rule-condition-list.feature'

export function UserRuleDetailConditionsTab({ community, rule }: { community: Community; rule: Rule }) {
  const { items } = useAdminFindManyNetworkToken({ cluster: community.cluster })
  return rule.conditions?.length ? (
    <UserRuleConditionListFeature rule={rule} community={community} tokens={items ?? []} />
  ) : (
    <RuleConditionUiCreateWizard rule={rule} community={community} tokens={items ?? []} />
  )
}
