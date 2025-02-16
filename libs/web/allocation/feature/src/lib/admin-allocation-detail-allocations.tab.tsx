import { Button } from '@mantine/core'
import { useAdminFindOneAllocation } from '@pubkey-link/web-allocation-data-access'

import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminAllocationDetailAllocationsTab({ allocationId }: { allocationId: string }) {
  const { item, query, checkAllocation } = useAdminFindOneAllocation({ allocationId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Allocation not found." />
  }

  return (
    <UiCard>
      <Button
        onClick={() =>
          checkAllocation(['dean.ser', 'whale.ser', 'whales.ser', 'BEEMANPx2jdmfR7jpn1hRdMuM2Vj4E3azBLb6RUBrCDY'])
        }
      >
        Check
      </Button>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </UiCard>
  )
}
