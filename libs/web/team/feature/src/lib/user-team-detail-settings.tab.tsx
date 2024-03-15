import { useUserFindOneTeam } from '@pubkey-link/web-team-data-access'
import { UserTeamUiUpdateForm } from '@pubkey-link/web-team-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserTeamDetailSettingsTab({ teamId }: { teamId: string }) {
  const { item, query, updateTeam } = useUserFindOneTeam({ teamId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  return (
    <UiCard>
      <UserTeamUiUpdateForm team={item} submit={updateTeam} />
    </UiCard>
  )
}
