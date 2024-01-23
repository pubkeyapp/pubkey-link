import { useRoutes } from 'react-router-dom'
import { AdminNetworkTokenDetailFeature } from './admin-network-token-detail.feature'
import { AdminNetworkTokenCreateFeature } from './admin-network-token-create.feature'
import { AdminNetworkTokenListFeature } from './admin-network-token-list.feature'
import { NetworkCluster } from '@pubkey-link/sdk'

export default function AdminNetworkTokenRoutes({ cluster }: { cluster: NetworkCluster }) {
  return useRoutes([
    { path: '', element: <AdminNetworkTokenListFeature cluster={cluster} /> },
    {
      path: 'create',
      element: <AdminNetworkTokenCreateFeature cluster={cluster} />,
    },
    { path: ':networkTokenId/*', element: <AdminNetworkTokenDetailFeature /> },
  ])
}
