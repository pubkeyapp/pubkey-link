import { Group } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindOneRole } from '@pubkey-link/web-role-data-access'
import { RoleUiItem } from '@pubkey-link/web-role-ui'
import { UiBack, UiDebugModal, UiError, UiGroup, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserRoleDetailConditionsTab } from './user-role-detail-conditions.tab'
import { UserRoleDetailPermissionsTab } from './user-role-detail-permissions.tab'
import { UserRoleDetailSettingsTab } from './user-role-detail-settings.tab'
import { UserRoleDetailValidateTab } from './user-role-detail-validate.tab'

export function UserRoleDetailFeature({ community }: { community: Community }) {
  const { roleId } = useParams<{ roleId: string }>() as { roleId: string }
  const { item, query } = useUserFindOneRole({ roleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Role not found." />
  }

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <RoleUiItem role={item} />
        </Group>
        <UiDebugModal data={item} />
      </UiGroup>
      <UiTabRoutes
        tabs={[
          {
            path: 'conditions',
            label: 'Conditions',
            element: <UserRoleDetailConditionsTab community={community} role={item} />,
          },
          {
            path: 'permissions',
            label: 'Permissions',
            element: <UserRoleDetailPermissionsTab role={item} />,
          },
          {
            path: 'validate',
            label: 'Validate',
            element: <UserRoleDetailValidateTab role={item} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <UserRoleDetailSettingsTab roleId={roleId} />,
          },
        ]}
      />
    </UiStack>
  )
}
