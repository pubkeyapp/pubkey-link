import { IconCurrencySolana, IconSettings, IconUsers, IconUsersGroup } from '@tabler/icons-react'
import { DashboardFeature } from '@pubkey-link/web-dashboard-feature'
import { SettingsFeature } from '@pubkey-link/web-settings-feature'
import { SolanaFeature } from '@pubkey-link/web-solana-feature'
import { UserFeature } from '@pubkey-link/web-user-feature'
import { UiDashboardItem } from '@pubkey-ui/core'
import { RouteObject, useRoutes } from 'react-router-dom'
import { UserCommunityFeature } from '@pubkey-link/web-community-feature'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Communities', icon: IconUsersGroup, to: '/c' },
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Solana', icon: IconCurrencySolana, to: '/solana' },
  { label: 'Users', icon: IconUsers, to: '/u' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/c/*', element: <UserCommunityFeature /> },
  { path: '/dashboard', element: <DashboardFeature links={links} /> },
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/u/*', element: <UserFeature /> },
]

export default function ShellUserRoutes() {
  return useRoutes(routes)
}
