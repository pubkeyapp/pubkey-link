import { useRoutes } from 'react-router-dom'
import { AdminNetworkDetailFeature } from './admin-network-detail.feature'
import { AdminNetworkCreateFeature } from './admin-network-create.feature'
import { AdminNetworkListFeature } from './admin-network-list.feature'

export default function AdminNetworkRoutes() {
  return useRoutes([
    { path: '', element: <AdminNetworkListFeature /> },
    {
      path: 'create',
      element: <AdminNetworkCreateFeature />,
    },
    { path: ':networkId/*', element: <AdminNetworkDetailFeature /> },
  ])
}
