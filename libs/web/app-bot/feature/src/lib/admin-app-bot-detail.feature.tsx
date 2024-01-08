import { Group, Text } from '@mantine/core'
import { useAdminFindOneAppBot } from '@pubkey-link/web-app-bot-data-access'
import { UiBack, UiDebugModal, UiError, UiGroup, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminAppBotDetailDashboardTab } from './admin-app-bot-detail-dashboard.tab'
import { AdminAppBotDetailSettingsTab } from './admin-app-bot-detail-settings.tab'

export function AdminAppBotDetailFeature() {
  const { appBotId } = useParams<{ appBotId: string }>() as { appBotId: string }
  const { item, query } = useAdminFindOneAppBot({ appBotId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="AppBot not found." />
  }

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <Text size="lg">Back to bots</Text>
        </Group>
        <Group>
          <UiDebugModal data={item} />
        </Group>
      </UiGroup>
      <UiTabRoutes
        tabs={[
          {
            value: 'dashboard',
            label: 'Dashboard',
            component: <AdminAppBotDetailDashboardTab appBotId={appBotId} />,
          },
          {
            value: 'settings',
            label: 'Settings',
            component: <AdminAppBotDetailSettingsTab appBotId={appBotId} />,
          },
        ]}
      />
    </UiStack>
  )
}
