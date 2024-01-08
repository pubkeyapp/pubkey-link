import { lazy } from 'react'

export const AuthLoginFeature = lazy(() => import('./lib/auth-login-feature'))
export const AuthRegisterFeature = lazy(() => import('./lib/auth-register-feature'))
