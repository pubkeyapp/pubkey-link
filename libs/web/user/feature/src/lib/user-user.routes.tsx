import { useAuth } from '@pubkey-link/web-auth-data-access'
import { UiWarning } from '@pubkey-ui/core'
import { Route, Routes } from 'react-router-dom'
import { UserUserDetailFeature } from './user-user-detail-feature'
import { UserUserListFeature } from './user-user-list-feature'

export default function UserUserRoutes() {
  const { user } = useAuth()

  if (!user?.username) {
    return <UiWarning message="User not found." />
  }

  return (
    <Routes>
      <Route index element={<UserUserListFeature />} />
      <Route path=":username/*" element={<UserUserDetailFeature />} />
    </Routes>
  )
}
