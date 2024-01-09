import { useAuth } from '@pubkey-link/web-auth-data-access'
import { UiContainer, UiDashboardGrid, UiDashboardItem } from '@pubkey-ui/core'
import { IconApps, IconCurrencySolana, IconSettings, IconUser } from '@tabler/icons-react'

const links: UiDashboardItem[] = [
  // User Dashboard Links
  { label: 'Apps', icon: IconApps, to: '/apps' },
  { label: 'Profile', icon: IconUser, to: '/profile' },
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Solana', icon: IconCurrencySolana, to: '/solana' },
]

export default function DashboardFeature() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <UiContainer>
      <UiDashboardGrid links={links} />
    </UiContainer>
  )
}
