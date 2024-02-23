import { Community } from '@pubkey-link/sdk'
import { useRoutes } from 'react-router-dom'
import { UserCommunityMemberListFeature } from './user-community-member-list.feature'

export default function UserCommunityMemberRoutes({ community }: { community: Community }) {
  return useRoutes([{ path: '', element: <UserCommunityMemberListFeature community={community} /> }])
}
