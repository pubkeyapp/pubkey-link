import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOneRole } from '@pubkey-link/web-role-data-access'
import { useParams } from 'react-router-dom'
import { AdminRoleDetailConditionsTab } from './admin-role-detail-conditions.tab'
import { AdminRoleDetailSettingsTab } from './admin-role-detail-settings.tab'

export function AdminRoleDetailFeature() {
  const { roleId } = useParams<{ roleId: string }>() as { roleId: string }
  const { item, query } = useAdminFindOneRole({ roleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Role not found." />
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
            element: <AdminRoleDetailConditionsTab roleId={roleId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminRoleDetailSettingsTab roleId={roleId} />,
          },
        ]}
      />
    </UiPage>
  )
}
