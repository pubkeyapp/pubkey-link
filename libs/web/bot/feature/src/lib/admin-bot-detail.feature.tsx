import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOneBot } from '@pubkey-link/web-bot-data-access'
import { useParams } from 'react-router-dom'
import { AdminBotDetailOverviewTab } from './admin-bot-detail-overview.tab'
import { AdminBotDetailSettingsTab } from './admin-bot-detail-settings.tab'

export function AdminBotDetailFeature() {
  const { botId } = useParams<{ botId: string }>() as { botId: string }
  const { item, query } = useAdminFindOneBot({ botId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Bot not found." />
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
            element: <AdminBotDetailOverviewTab botId={botId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminBotDetailSettingsTab botId={botId} />,
          },
        ]}
      />
    </UiPage>
  )
}
