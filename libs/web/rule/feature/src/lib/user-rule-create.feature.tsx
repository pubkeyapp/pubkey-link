import { Community, UserCreateRuleInput } from '@pubkey-link/sdk'
import { useUserFindManyRule } from '@pubkey-link/web-rule-data-access'
import { UserRuleUiCreateForm } from '@pubkey-link/web-rule-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserRuleCreateFeature({ community }: { community: Community }) {
  const navigate = useNavigate()
  const { createRule } = useUserFindManyRule({ communityId: community.id })

  async function submit(input: UserCreateRuleInput) {
    return createRule(input)
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
    <UiPage leftAction={<UiBack />} title="Create Rule">
      <UiCard>
        <UserRuleUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
