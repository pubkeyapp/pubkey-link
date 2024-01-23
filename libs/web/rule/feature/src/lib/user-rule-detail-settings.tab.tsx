import { useUserFindOneRule } from '@pubkey-link/web-rule-data-access'
import { UserRuleUiUpdateForm } from '@pubkey-link/web-rule-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserRuleDetailSettingsTab({ ruleId }: { ruleId: string }) {
  const { item, query, updateRule } = useUserFindOneRule({ ruleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Rule not found." />
  }

  return (
    <UiCard>
      <UserRuleUiUpdateForm rule={item} submit={updateRule} />
    </UiCard>
  )
}
