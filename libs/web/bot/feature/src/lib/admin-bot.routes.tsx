import { useRoutes } from 'react-router-dom'
import { AdminBotCreateFeature } from './admin-bot-create.feature'
import { AdminBotDetailFeature } from './admin-bot-detail.feature'
import { AdminBotListFeature } from './admin-bot-list.feature'

export default function AdminBotRoutes({ communityId }: { communityId: string }) {
  return useRoutes([
    { path: '', element: <AdminBotListFeature communityId={communityId} /> },
    {
      path: 'create',
      element: <AdminBotCreateFeature communityId={communityId} />,
    },
    { path: ':botId/*', element: <AdminBotDetailFeature /> },
  ])
}
