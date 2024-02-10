import { NetworkCluster } from '@pubkey-link/sdk'
import { useRoutes } from 'react-router-dom'
import { UserNetworkTokenListFeature } from './user-network-token-list.feature'

export default function UserNetworkTokenRoutes({ cluster, username }: { cluster: NetworkCluster; username: string }) {
  return useRoutes([
    //
    { path: '', element: <UserNetworkTokenListFeature cluster={cluster} username={username} /> },
  ])
}
