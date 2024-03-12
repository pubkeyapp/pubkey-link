import { UserCreateTeamInput } from '@pubkey-link/sdk'
import { useUserFindManyTeam } from '@pubkey-link/web-team-data-access'
import { UserTeamUiCreateForm } from '@pubkey-link/web-team-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserTeamCreateFeature({ communityId }: { communityId: string }) {
  const navigate = useNavigate()
  const { createTeam } = useUserFindManyTeam({ communityId })

  async function submit(input: UserCreateTeamInput) {
    return createTeam(input)
      .then((res) => {
        if (res) {
          navigate(`../${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Team">
      <UiCard>
        <UserTeamUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
