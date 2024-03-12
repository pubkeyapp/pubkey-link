import { useAdminFindOneTeam } from '@pubkey-link/web-team-data-access'
import { AdminTeamUiUpdateForm } from '@pubkey-link/web-team-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminTeamDetailSettingsTab({ teamId }: { teamId: string }) {
  const { item, query, updateTeam } = useAdminFindOneTeam({ teamId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  return (
    <UiCard>
      <AdminTeamUiUpdateForm team={item} submit={updateTeam} />
    </UiCard>
  )
}
