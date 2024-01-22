import { DashboardFeature } from '@pubkey-link/web-dashboard-feature'
import { SettingsFeature } from '@pubkey-link/web-settings-feature'
import { SolanaFeature } from '@pubkey-link/web-solana-feature'
import { UserFeature } from '@pubkey-link/web-user-feature'
import { UiDashboardItem } from '@pubkey-ui/core'
import { IconCurrencySolana, IconSettings, IconUsers } from '@tabler/icons-react'
import { RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Solana', icon: IconCurrencySolana, to: '/solana' },
  { label: 'Users', icon: IconUsers, to: '/u' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/dashboard', element: <DashboardFeature links={links} /> },
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/u/*', element: <UserFeature /> },
]

export default function ShellUserRoutes() {
  return useRoutes(routes)
}
