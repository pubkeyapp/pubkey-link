import { useUserFindOneTeam } from '@pubkey-link/web-team-data-access'
import { TeamUiInfo } from '@pubkey-link/web-team-ui'
import { UiCard, UiError, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserTeamDetailInfoTab({ teamId }: { teamId: string }) {
  const { item, query } = useUserFindOneTeam({ teamId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  return (
    <UiStack>
      <UiInfo title="Community Team" message="All members in this team will share the roles linked to this identity" />
      <UiCard>
        <TeamUiInfo team={item} />
      </UiCard>
    </UiStack>
  )
}
