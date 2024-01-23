import { useAdminFindOneRule } from '@pubkey-link/web-rule-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminRuleDetailOverviewTab({ ruleId }: { ruleId: string }) {
  const { item, query } = useAdminFindOneRule({ ruleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Rule not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
