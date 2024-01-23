import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiGroup, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useUserFindOneRule } from '@pubkey-link/web-rule-data-access'
import { useParams } from 'react-router-dom'
import { UserRuleDetailConditionsTab } from './user-rule-detail-conditions.tab'
import { UserRuleDetailSettingsTab } from './user-rule-detail-settings.tab'
import { UserRuleDetailValidateTab } from './user-rule-detail-validate.tab'
import { RuleUiItem } from '@pubkey-link/web-rule-ui'

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
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <RuleUiItem rule={item} />
        </Group>
        <UiDebugModal data={item} />
      </UiGroup>
      <UiTabRoutes
        tabs={[
          {
            path: 'conditions',
            label: 'Conditions',
            element: <UserRuleDetailConditionsTab ruleId={ruleId} />,
          },
          {
            path: 'validate',
            label: 'Validate',
            element: <UserRuleDetailValidateTab rule={item} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <UserRuleDetailSettingsTab ruleId={ruleId} />,
          },
        ]}
      />
    </UiStack>
  )
}
