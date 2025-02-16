import { useAdminFindOneAllocation } from '@pubkey-link/web-allocation-data-access'
import { AllocationUiInfo } from '@pubkey-link/web-allocation-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminAllocationDetailInfoTab({ allocationId }: { allocationId: string }) {
  const { item, query } = useAdminFindOneAllocation({ allocationId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Allocation not found." />
  }

  return (
    <UiCard>
      <AllocationUiInfo allocation={item} />
    </UiCard>
  )
}
