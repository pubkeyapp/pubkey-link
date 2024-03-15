import { useAdminFindOneTeam } from '@pubkey-link/web-team-data-access'
import { TeamUiInfo } from '@pubkey-link/web-team-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminTeamDetailInfoTab({ teamId }: { teamId: string }) {
  const { item, query } = useAdminFindOneTeam({ teamId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  return (
    <UiCard>
      <TeamUiInfo team={item} />
    </UiCard>
  )
}
