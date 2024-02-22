import { AppConfig, IdentityProvider } from '@pubkey-link/sdk'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { useSdk } from './sdk-provider'

export interface AppConfigContext {
  appConfig?: AppConfig | undefined
  appConfigLoading: boolean
  authEnabled: boolean
  enabledProviders: IdentityProvider[]
}

const Context = createContext<AppConfigContext>({} as AppConfigContext)

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const sdk = useSdk()
  const configQuery = useQuery({
    queryKey: ['app-config'],
    queryFn: () => sdk.appConfig().then((res) => res.data),
  })

  const authEnabled = useMemo(() => {
    if (!configQuery.data?.config) return false
    const { authLoginProviders, authPasswordEnabled, authRegisterEnabled } = configQuery.data.config
    return !!authLoginProviders?.length || authRegisterEnabled || authPasswordEnabled
  }, [configQuery.data?.config])

  const enabledProviders: IdentityProvider[] = useMemo(
    () =>
      configQuery.data?.config
        ? ((configQuery.data?.config.authLoginProviders ?? []).filter(Boolean) as IdentityProvider[])
        : [],
    [configQuery.data?.config],
  )

  const value = {
    appConfig: configQuery.data?.config,
    appConfigLoading: configQuery.isLoading,
    authEnabled,
    enabledProviders,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAppConfig() {
  return useContext(Context)
}
