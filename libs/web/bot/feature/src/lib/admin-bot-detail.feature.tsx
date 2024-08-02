import { Button, Group } from '@mantine/core'
import { useAdminFindOneBot } from '@pubkey-link/web-bot-data-access'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link, useParams } from 'react-router-dom'
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
          <Button size="xs" variant="light" component={Link} to={`/c/${item.communityId}/discord`}>
            Configure
          </Button>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <AdminBotDetailSettingsTab botId={botId} />
    </UiPage>
  )
}
