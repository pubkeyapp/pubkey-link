import { Group } from '@mantine/core'
import { AdminAppBotFeature } from '@pubkey-link/web-app-bot-feature'
import { useAdminFindOneApp } from '@pubkey-link/web-app-data-access'
import { AppUiLabel } from '@pubkey-link/web-app-ui'
import { AdminAppUserFeature } from '@pubkey-link/web-app-user-feature'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminAppDetailOverviewTab } from './admin-app-detail-overview.tab'
import { AdminAppDetailSettingsTab } from './admin-app-detail-settings.tab'

export function AdminAppDetailFeature() {
  const { appId } = useParams<{ appId: string }>() as { appId: string }
  const { item, query } = useAdminFindOneApp({ appId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="App not found." />
  }

  return (
    <UiPage
      title={<AppUiLabel app={item} />}
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
            value: 'overview',
            label: 'Overview',
            component: <AdminAppDetailOverviewTab appId={appId} />,
          },
          {
            value: 'bots',
            label: 'Bots',
            component: <AdminAppBotFeature appId={appId} />,
          },
          {
            value: 'users',
            label: 'Users',
            component: <AdminAppUserFeature appId={appId} />,
          },
          {
            value: 'settings',
            label: 'Settings',
            component: <AdminAppDetailSettingsTab appId={appId} />,
          },
        ]}
      />
    </UiPage>
  )
}
