import { UserCreateCommunityMemberInput } from '@pubkey-link/sdk'
import { useUserFindManyCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { UserCommunityMemberUiCreateForm } from '@pubkey-link/web-community-member-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserCommunityMemberCreateFeature() {
  const navigate = useNavigate()
  const { createCommunityMember } = useUserFindManyCommunityMember()

  async function submit(input: UserCreateCommunityMemberInput) {
    return createCommunityMember(input)
      .then((res) => {
        if (res) {
          navigate(`./${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create CommunityMember">
      <UiCard>
        <UserCommunityMemberUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
