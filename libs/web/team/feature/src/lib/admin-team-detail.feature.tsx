import { Group } from '@mantine/core'
import { useAdminFindOneTeam } from '@pubkey-link/web-team-data-access'
import { TeamUiItem } from '@pubkey-link/web-team-ui'
import { UiBack, UiDebugModal, UiError, UiGroup, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminTeamDetailInfoTab } from './admin-team-detail-info.tab'
import { AdminTeamDetailSettingsTab } from './admin-team-detail-settings.tab'

export function AdminTeamDetailFeature() {
  const { teamId } = useParams<{ teamId: string }>() as { teamId: string }
  const { item, query } = useAdminFindOneTeam({ teamId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <TeamUiItem team={item} />
        </Group>
        <UiDebugModal data={item} />
      </UiGroup>

      <UiTabRoutes
        tabs={[
          {
            path: 'info',
            label: 'Info',
            element: <AdminTeamDetailInfoTab teamId={teamId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminTeamDetailSettingsTab teamId={teamId} />,
          },
        ]}
      />
    </UiStack>
  )
}
