import { Alert } from '@mantine/core'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { ReactElement } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function AuthUiRouteGuard({ redirectTo, loader }: { redirectTo: string; loader: ReactElement }) {
  const { authenticated, error, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return loader
  }

  if (error) {
    return <Alert title={'An error occurred'}>{error instanceof Error ? error.message : `${error}`}</Alert>
  }

  return authenticated ? <Outlet /> : <Navigate replace to={redirectTo} state={{ from: location }} />
}
