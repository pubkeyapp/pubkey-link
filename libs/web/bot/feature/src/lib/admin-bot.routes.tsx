import { useRoutes } from 'react-router-dom'
import { AdminBotDetailFeature } from './admin-bot-detail.feature'
import { AdminBotCreateFeature } from './admin-bot-create.feature'
import { AdminBotListFeature } from './admin-bot-list.feature'

export default function AdminBotRoutes() {
  return useRoutes([
    { path: '', element: <AdminBotListFeature /> },
    {
      path: 'create',
      element: <AdminBotCreateFeature />,
    },
    { path: ':botId/*', element: <AdminBotDetailFeature /> },
  ])
}
