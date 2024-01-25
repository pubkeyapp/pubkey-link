import { Community } from '@pubkey-link/sdk'
import { useRoutes } from 'react-router-dom'
import { UserBotDetailFeature } from './user-bot-detail.feature'

export default function UserBotRoutes({ community }: { community: Community }) {
  return useRoutes([
    // We only have one route since we only support 1 Discord bot per community.
    { path: '*', element: <UserBotDetailFeature community={community} /> },
  ])
}
