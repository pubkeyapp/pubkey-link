import { useRoutes } from 'react-router-dom'
import { AdminAppBotCreateFeature } from './admin-app-bot-create.feature'
import { AdminAppBotDetailFeature } from './admin-app-bot-detail.feature'
import { AdminAppBotListFeature } from './admin-app-bot-list.feature'

export default function AdminAppBotRoutes({ appId }: { appId: string }) {
  return useRoutes([
    { path: '', element: <AdminAppBotListFeature appId={appId} /> },
    {
      path: 'create',
      element: <AdminAppBotCreateFeature appId={appId} />,
    },
    { path: ':appBotId/*', element: <AdminAppBotDetailFeature /> },
  ])
}
