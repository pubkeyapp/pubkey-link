import { AdminCreateCommunityMemberInput } from '@pubkey-link/sdk'
import { useAdminFindManyCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { AdminCommunityMemberUiCreateForm } from '@pubkey-link/web-community-member-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminCommunityMemberCreateFeature({ communityId }: { communityId: string }) {
  const navigate = useNavigate()
  const { createCommunityMember } = useAdminFindManyCommunityMember({ communityId })

  async function submit(input: AdminCreateCommunityMemberInput) {
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
        <AdminCommunityMemberUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
