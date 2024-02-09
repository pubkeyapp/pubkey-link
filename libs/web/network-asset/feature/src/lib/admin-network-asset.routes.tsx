import { NetworkCluster } from '@pubkey-link/sdk'
import { useRoutes } from 'react-router-dom'
import { AdminNetworkAssetDetailFeature } from './admin-network-asset-detail.feature'
import { AdminNetworkAssetListFeature } from './admin-network-asset-list.feature'

export default function AdminNetworkAssetRoutes({ cluster }: { cluster: NetworkCluster }) {
  return useRoutes([
    { path: '', element: <AdminNetworkAssetListFeature cluster={cluster} /> },
    { path: ':networkAssetId/*', element: <AdminNetworkAssetDetailFeature /> },
  ])
}
