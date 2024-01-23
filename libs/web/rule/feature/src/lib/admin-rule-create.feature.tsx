import { AdminCreateRuleInput } from '@pubkey-link/sdk'
import { useAdminFindManyRule } from '@pubkey-link/web-rule-data-access'
import { AdminRuleUiCreateForm } from '@pubkey-link/web-rule-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminRuleCreateFeature({ communityId }: { communityId: string }) {
  const navigate = useNavigate()
  const { createRule } = useAdminFindManyRule({ communityId })

  async function submit(input: AdminCreateRuleInput) {
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
        <AdminRuleUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
