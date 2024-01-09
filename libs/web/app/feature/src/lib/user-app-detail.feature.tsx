import { Button, Group } from '@mantine/core'
import { useUserFindOneApp } from '@pubkey-link/web-app-data-access'
import { AppUiLabel } from '@pubkey-link/web-app-ui'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import {
  UiBack,
  UiCard,
  UiDebug,
  UiDebugModal,
  UiError,
  UiGridRoute,
  UiGridRoutes,
  UiLoader,
  UiPage,
} from '@pubkey-ui/core'
import { IconBrandDiscord, IconDashboard, IconReport, IconSettings, IconTags } from '@tabler/icons-react'
import { Link, useParams } from 'react-router-dom'
import { UserAppDetailDashboard } from './user-app-detail-dashboard'
import { UserAppDetailSettings } from './user-app-detail-settings'

export function UserAppDetailFeature() {
  const { appId } = useParams<{ appId: string }>() as { appId: string }
  const { isAdmin } = useAuth()
  const { isAppAdmin, item, query } = useUserFindOneApp({ appId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="App not found." />
  }
  const routes: UiGridRoute[] = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      leftSection: <IconDashboard size={20} />,
      element: <UserAppDetailDashboard app={item} />,
    },
    {
      path: 'discord',
      label: 'Discord',
      leftSection: <IconBrandDiscord size={20} />,
      element: (
        <UiCard title="Discord">
          <UiDebug data={item} />
        </UiCard>
      ),
    },
    {
      path: 'roles',
      label: 'Roles',
      leftSection: <IconTags size={20} />,
      element: (
        <UiCard title="Roles">
          <UiDebug data={item} />
        </UiCard>
      ),
    },
    {
      path: 'reports',
      label: 'Reports',
      leftSection: <IconReport size={20} />,
      element: (
        <UiCard title="Reports">
          <UiDebug data={item} />
        </UiCard>
      ),
    },
  ]
  if (isAppAdmin) {
    routes.push({
      path: 'settings',
      label: 'Settings',
      leftSection: <IconSettings size={20} />,
      element: <UserAppDetailSettings app={item} />,
    })
  }
  return (
    <UiPage
      title={<AppUiLabel app={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
          {isAdmin ? (
            <Button component={Link} to={`/admin/apps/${appId}`} variant="light" size="xs">
              Admin
            </Button>
          ) : null}
        </Group>
      }
    >
      <UiGridRoutes basePath={`/apps/${appId}`} routes={routes} />
    </UiPage>
  )
}
