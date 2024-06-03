import { useRoutes } from 'react-router-dom'
import { UserNetworkTokenListFeature } from './user-network-token-list.feature'

export default function UserNetworkTokenRoutes({ username }: { username: string }) {
  return useRoutes([
    //
    { path: '', element: <UserNetworkTokenListFeature username={username} /> },
  ])
}
