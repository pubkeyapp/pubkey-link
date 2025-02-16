import { useAdminFindOneAllocation } from '@pubkey-link/web-allocation-data-access'
import { AdminAllocationUiUpdateForm } from '@pubkey-link/web-allocation-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminAllocationDetailSettingsTab({ allocationId }: { allocationId: string }) {
  const { item, query, updateAllocation } = useAdminFindOneAllocation({ allocationId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Allocation not found." />
  }

  return (
    <UiCard>
      <AdminAllocationUiUpdateForm allocation={item} submit={updateAllocation} />
    </UiCard>
  )
}
