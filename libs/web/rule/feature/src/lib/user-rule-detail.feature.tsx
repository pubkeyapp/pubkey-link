import { Group } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindOneRule } from '@pubkey-link/web-rule-data-access'
import { RuleUiItem } from '@pubkey-link/web-rule-ui'
import { UiBack, UiDebugModal, UiError, UiGroup, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserRuleDetailConditionsTab } from './user-rule-detail-conditions.tab'
import { UserRuleDetailPermissionsTab } from './user-rule-detail-permissions.tab'
import { UserRuleDetailSettingsTab } from './user-rule-detail-settings.tab'
import { UserRuleDetailValidateTab } from './user-rule-detail-validate.tab'

export function UserRuleDetailFeature({ community }: { community: Community }) {
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
            element: <UserRuleDetailConditionsTab community={community} rule={item} />,
          },
          {
            path: 'permissions',
            label: 'Permissions',
            element: <UserRuleDetailPermissionsTab rule={item} />,
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
