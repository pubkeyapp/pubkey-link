import { type UiGridRoute, UiGridRoutes } from '@pubkey-ui/core'
import { IconNumber, IconServer, IconWallet } from '@tabler/icons-react'
import { lazy } from 'react'

export const AccountListFeature = lazy(() => import('./account/account-list-feature'))
export const AccountDetailFeature = lazy(() => import('./account/account-detail-feature'))
export const ClusterFeature = lazy(() => import('./cluster/cluster-feature'))
export const CounterFeature = lazy(() => import('./counter/counter-feature'))

export default function SolanaFeature() {
  const routes: UiGridRoute[] = [
    { path: 'accounts', label: 'Accounts', element: <AccountListFeature />, leftSection: <IconWallet size={20} /> },
    { path: 'accounts/:address', element: <AccountDetailFeature /> },
    { path: 'clusters', label: 'Clusters', element: <ClusterFeature />, leftSection: <IconServer size={20} /> },
    { path: 'counter', label: 'Counter', element: <CounterFeature />, leftSection: <IconNumber size={20} /> },
  ]
  return <UiGridRoutes basePath={`/solana`} routes={routes} />
}
