import { Group } from '@mantine/core'
import { useAdminFindOneAllocation } from '@pubkey-link/web-allocation-data-access'
import { AllocationUiItem } from '@pubkey-link/web-allocation-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminAllocationDetailAllocationsTab } from './admin-allocation-detail-allocations.tab'
import { AdminAllocationDetailInfoTab } from './admin-allocation-detail-info.tab'
import { AdminAllocationDetailSettingsTab } from './admin-allocation-detail-settings.tab'

export function AdminAllocationDetailFeature() {
  const { allocationId } = useParams<{ allocationId: string }>() as { allocationId: string }
  const { item, query } = useAdminFindOneAllocation({ allocationId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Allocation not found." />
  }

  return (
    <UiPage
      title={<AllocationUiItem allocation={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'info',
            label: 'Info',
            element: <AdminAllocationDetailInfoTab allocationId={allocationId} />,
          },
          {
            path: 'allocations',
            label: 'Allocations',
            element: <AdminAllocationDetailAllocationsTab allocationId={allocationId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminAllocationDetailSettingsTab allocationId={allocationId} />,
          },
        ]}
      />
    </UiPage>
  )
}
