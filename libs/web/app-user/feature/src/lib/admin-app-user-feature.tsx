import { UiNotFound } from '@pubkey-ui/core'
import { useRoutes } from 'react-router-dom'
import { AdminAppUserListFeature } from './admin-app-user-list.feature'

export default function AdminAppUserRoutes({ appId }: { appId: string }) {
  return useRoutes([
    { path: '', element: <AdminAppUserListFeature appId={appId} /> },
    { path: '*', element: <UiNotFound to={`/admin/apps/${appId}/users`} /> },
  ])
}
