import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOneRule } from '@pubkey-link/web-rule-data-access'
import { useParams } from 'react-router-dom'
import { AdminRuleDetailConditionsTab } from './admin-rule-detail-conditions.tab'
import { AdminRuleDetailSettingsTab } from './admin-rule-detail-settings.tab'

export function AdminRuleDetailFeature() {
  const { ruleId } = useParams<{ ruleId: string }>() as { ruleId: string }
  const { item, query } = useAdminFindOneRule({ ruleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Rule not found." />
  }

  return (
    <UiPage
      title={<Group>{item.name}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'conditions',
            label: 'Conditions',
            element: <AdminRuleDetailConditionsTab ruleId={ruleId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminRuleDetailSettingsTab ruleId={ruleId} />,
          },
        ]}
      />
    </UiPage>
  )
}
