import { NetworkCluster } from '@pubkey-link/sdk'
import { useRoutes } from 'react-router-dom'
import { AdminResolverCreateFeature } from './admin-resolver-create.feature'
import { AdminResolverDetailFeature } from './admin-resolver-detail.feature'
import { AdminResolverListFeature } from './admin-resolver-list.feature'

export default function AdminResolverRoutes({ cluster }: { cluster: NetworkCluster }) {
  return useRoutes([
    { path: '', element: <AdminResolverListFeature cluster={cluster} /> },
    {
      path: 'create',
      element: <AdminResolverCreateFeature cluster={cluster} />,
    },
    { path: ':resolverId/*', element: <AdminResolverDetailFeature /> },
  ])
}
