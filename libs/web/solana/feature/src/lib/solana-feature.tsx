import { Grid, NavLink } from '@mantine/core'
import { UiNotFound } from '@pubkey-ui/core'
import { lazy, ReactNode } from 'react'
import { Link, Navigate, useLocation, useRoutes } from 'react-router-dom'

export const AccountListFeature = lazy(() => import('./account/account-list-feature'))
export const AccountDetailFeature = lazy(() => import('./account/account-detail-feature'))
export const ClusterFeature = lazy(() => import('./cluster/cluster-feature'))
export const CounterFeature = lazy(() => import('./counter/counter-feature'))

export default function SolanaFeature() {
  return <SolanaLayout />
}
export function SolanaLayout() {
  const { pathname } = useLocation()
  const demos: {
    path: string
    label?: string
    element: ReactNode
  }[] = [
    { path: 'accounts', label: 'Accounts', element: <AccountListFeature /> },
    { path: 'accounts/:address', element: <AccountDetailFeature /> },
    { path: 'clusters', label: 'Clusters', element: <ClusterFeature /> },
    { path: 'counter', label: 'Counter', element: <CounterFeature /> },
  ]

  const routes = useRoutes([
    { index: true, element: <Navigate to={demos[0].path} replace /> },
    ...demos.map((demo) => ({ path: `${demo.path}/*`, element: demo.element })),
    { path: '*', element: <UiNotFound to="/demo" /> },
  ])

  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 2 }}>
        {demos
          .filter((demo) => demo.label)
          .map((demo) => {
            const to = `/solana/${demo.path}`
            return (
              <NavLink active={pathname.startsWith(to)} component={Link} key={demo.path} label={demo.label} to={to} />
            )
          })}
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 10 }}>{routes}</Grid.Col>
    </Grid>
  )
}
