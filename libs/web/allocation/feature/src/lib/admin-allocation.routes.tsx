import { useRoutes } from 'react-router-dom'
import { AdminAllocationDetailFeature } from './admin-allocation-detail.feature'
import { AdminAllocationCreateFeature } from './admin-allocation-create.feature'
import { AdminAllocationListFeature } from './admin-allocation-list.feature'

export default function AdminAllocationRoutes() {
  return useRoutes([
    { path: '', element: <AdminAllocationListFeature /> },
    {
      path: 'create',
      element: <AdminAllocationCreateFeature />,
    },
    { path: ':allocationId/*', element: <AdminAllocationDetailFeature /> },
  ])
}
