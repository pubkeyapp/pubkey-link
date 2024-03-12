import { Group } from '@mantine/core'
import { Community, UserCreateRoleInput } from '@pubkey-link/sdk'
import { useUserFindManyRole } from '@pubkey-link/web-role-data-access'
import { UserRoleUiCreateForm } from '@pubkey-link/web-role-ui'
import { toastError, UiBack, UiCard, UiCardTitle, UiStack } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserRoleCreateFeature({ community }: { community: Community }) {
  const navigate = useNavigate()
  const { createRole } = useUserFindManyRole({ communityId: community.id })

  async function submit(input: UserCreateRoleInput) {
    return createRole(input)
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
    <UiStack>
      <Group>
        <UiBack />
        <UiCardTitle>Create Role</UiCardTitle>
      </Group>
      <UiCard>
        <UserRoleUiCreateForm submit={submit} />
      </UiCard>
    </UiStack>
  )
}
