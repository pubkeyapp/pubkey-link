import { useAuth } from '@pubkey-link/web-auth-data-access'
import { UiContainer, UiDashboardGrid, UiDashboardItem } from '@pubkey-ui/core'

export default function DashboardFeature({ links }: { links: UiDashboardItem[] }) {
  const { user } = useAuth()

  if (!user) return null

  return (
    <UiContainer>
      <UiDashboardGrid links={links} />
    </UiContainer>
  )
}
