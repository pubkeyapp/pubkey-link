import { Group } from '@mantine/core'
import { IdentityProvider, UserCreateTeamInput } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyTeam } from '@pubkey-link/web-team-data-access'
import { UserTeamUiCreateForm } from '@pubkey-link/web-team-ui'
import { toastError, UiBack, UiCard, UiCardTitle, UiInfo, UiStack, UiWarning } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserTeamCreateFeature({ communityId }: { communityId: string }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { createTeam, items } = useUserFindManyTeam({ communityId })

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

  const identities = (user?.identities ?? [])?.filter((i) => i.provider === IdentityProvider.Solana)
  const usedIdentityIds = items?.map((t) => t.identityId)

  return (
    <UiStack>
      <Group>
        <UiBack />
        <UiCardTitle>Create Team</UiCardTitle>
      </Group>
      <UiInfo
        title="Share an Identity with your Team"
        message="All members in this team will share the roles linked to the identity you choose."
      />

      {identities?.length ? (
        <UiCard>
          <UserTeamUiCreateForm submit={submit} identities={identities} usedIdentityIds={usedIdentityIds} />
        </UiCard>
      ) : (
        <UiWarning message="You need to link a Solana identity first" />
      )}
    </UiStack>
  )
}
