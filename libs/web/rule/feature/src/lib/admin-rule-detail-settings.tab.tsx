import { useAdminFindOneRule } from '@pubkey-link/web-rule-data-access'
import { AdminRuleUiUpdateForm } from '@pubkey-link/web-rule-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminRuleDetailSettingsTab({ ruleId }: { ruleId: string }) {
  const { item, query, updateRule } = useAdminFindOneRule({ ruleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Rule not found." />
  }

  return (
    <UiCard>
      <AdminRuleUiUpdateForm rule={item} submit={updateRule} />
    </UiCard>
  )
}
