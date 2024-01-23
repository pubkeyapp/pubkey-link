import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useUserFindOneRule } from '@pubkey-link/web-rule-data-access'
import { useParams } from 'react-router-dom'
import { UserRuleDetailOverviewTab } from './user-rule-detail-overview.tab'
import { UserRuleDetailSettingsTab } from './user-rule-detail-settings.tab'

export function UserRuleDetailFeature() {
  const { ruleId } = useParams<{ ruleId: string }>() as { ruleId: string }
  const { item, query } = useUserFindOneRule({ ruleId })

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
            path: 'overview',
            label: 'Overview',
            element: <UserRuleDetailOverviewTab ruleId={ruleId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <UserRuleDetailSettingsTab ruleId={ruleId} />,
          },
        ]}
      />
    </UiPage>
  )
}
