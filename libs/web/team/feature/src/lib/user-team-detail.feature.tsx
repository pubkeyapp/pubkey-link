import { Group } from '@mantine/core'
import { useUserFindOneTeam } from '@pubkey-link/web-team-data-access'
import { TeamUiItem } from '@pubkey-link/web-team-ui'
import { UiBack, UiDebugModal, UiError, UiGroup, UiLoader, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserTeamDetailInfoTab } from './user-team-detail-info.tab'
import { UserTeamDetailMembersTab } from './user-team-detail-members.tab'
import { UserTeamDetailSettingsTab } from './user-team-detail-settings.tab'

export function UserTeamDetailFeature() {
  const { teamId } = useParams<{ teamId: string }>() as { teamId: string }
  const { item, query } = useUserFindOneTeam({ teamId })

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
            element: <UserTeamDetailInfoTab teamId={teamId} />,
          },
          {
            path: 'members',
            label: 'Members',
            element: <UserTeamDetailMembersTab teamId={teamId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <UserTeamDetailSettingsTab teamId={teamId} />,
          },
        ]}
      />
    </UiStack>
  )
}
