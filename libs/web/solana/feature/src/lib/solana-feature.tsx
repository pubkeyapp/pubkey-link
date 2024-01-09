import { UiGridRoutes, UiStack } from '@pubkey-ui/core'
import { lazy } from 'react'

export const AccountListFeature = lazy(() => import('./account/account-list-feature'))
export const AccountDetailFeature = lazy(() => import('./account/account-detail-feature'))
export const ClusterFeature = lazy(() => import('./cluster/cluster-feature'))
export const CounterFeature = lazy(() => import('./counter/counter-feature'))

export default function SolanaFeature() {
  return (
    <UiStack>
      <UiGridRoutes
        basePath={`/solana`}
        routes={[
          { path: 'accounts', label: 'Accounts', element: <AccountListFeature /> },
          { path: 'accounts/:address', element: <AccountDetailFeature /> },
          { path: 'clusters', label: 'Clusters', element: <ClusterFeature /> },
          { path: 'counter', label: 'Counter', element: <CounterFeature /> },
        ]}
      />
    </UiStack>
  )
}
