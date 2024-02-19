import { useAuth } from '@pubkey-link/web-auth-data-access'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthUiOnboardedGuard({ redirectTo }: { redirectTo: string }) {
  const { hasSolana } = useAuth()

  return hasSolana ? <Outlet /> : <Navigate replace to={redirectTo} />
}
