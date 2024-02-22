import { IdentityProvider, LoginInput, RegisterInput, User, UserRole } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'
import { useMe } from './use-me'

type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading' | 'error'

export interface AuthState {
  status: AuthStatus
  error?: unknown | undefined
  user?: User | undefined
}

export interface AuthProviderContext extends AuthState {
  authenticated: boolean
  error?: unknown | undefined
  hasSolana: boolean
  isAdmin: boolean
  isDeveloper: boolean
  loading: boolean
  login: (input: LoginInput) => Promise<User | undefined>
  logout: () => Promise<boolean | undefined>
  refresh: () => Promise<boolean>
  register: (input: RegisterInput) => Promise<User | undefined>
}

const Context = createContext<AuthProviderContext>({} as AuthProviderContext)

export type AuthAction =
  | { type: 'login'; payload: User }
  | { type: 'logout'; payload?: unknown }
  | { type: 'error'; payload: unknown }
  | { type: 'loading'; payload?: unknown }

function authReducer(state: AuthState, { type, payload }: AuthAction): AuthState {
  switch (type) {
    case 'login':
      return {
        ...state,
        status: 'authenticated',
        user: payload,
      }
    case 'logout':
      return {
        ...state,
        status: 'unauthenticated',
        user: undefined,
      }
    case 'error':
      return {
        ...state,
        status: 'error',
        error: payload,
      }
    case 'loading':
      return {
        ...state,
        status: 'loading',
      }
    default:
      return state
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const sdk = useSdk()
  const me = useMe(sdk)

  const [state, dispatch] = useReducer(authReducer, { status: 'loading' })

  function dispatchUser(user?: User | null) {
    dispatch(user ? { type: 'login', payload: user } : { type: 'logout' })
    return !!user
  }

  useEffect(() => {
    if (me.isLoading) return
    dispatchUser(me.data?.me)
  }, [me.isLoading, me.data?.me])

  const hasSolana = (state.user?.identities ?? []).some(
    (identity) => identity.verified === true && identity.provider === IdentityProvider.Solana,
  )

  const value: AuthProviderContext = {
    authenticated: state.status === 'authenticated',
    error: state.error,
    hasSolana,
    isAdmin: state.user?.role === UserRole.Admin,
    isDeveloper: state.user?.developer ?? false,
    user: state.user,
    status: state.status,
    loading: state.status === 'loading',

    login: (input: LoginInput) =>
      sdk
        .login({ input })
        .then((res) => {
          if (res.data.login) {
            toastSuccess('Login successful')
            dispatch({ type: 'login', payload: res.data.login })
            return res.data.login
          }
          toastError('Login failed')
        })
        .catch((err) => {
          toastError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
    logout: () =>
      sdk
        .logout()
        .then((res) => {
          if (res.data.logout) {
            toastSuccess('Logout successful')
            dispatch({ type: 'logout' })
            return res.data.logout
          }
          toastError('Logout failed')
        })
        .catch((err) => {
          toastError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
    refresh: async () => me.refetch().then((res) => dispatchUser(res.data?.me)),
    register: (input: RegisterInput) =>
      sdk
        .register({ input })
        .then((res) => {
          if (res.data.register) {
            toastSuccess('Register successful')
            dispatch({ type: 'login', payload: res.data.register })
            return res.data.register
          }
          toastError('Register failed')
        })
        .catch((err) => {
          toastError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAuth() {
  return useContext(Context)
}
