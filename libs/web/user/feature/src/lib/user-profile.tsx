import { UiContainer } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserProfileLoader } from './user-profile-loader'

export function UserProfile() {
  const { username } = useParams<{ username: string }>() as { username: string }

  return username ? (
    <UiContainer size={1080}>
      <UserProfileLoader username={username} />
    </UiContainer>
  ) : null
}
