import { AppConfig, AppFeature, IdentityProvider } from '@pubkey-link/sdk'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { useSdk } from './sdk-provider'

export interface AppConfigContext {
  appConfig?: AppConfig | undefined
  appConfigLoading: boolean
  authEnabled: boolean
  enabledProviders: IdentityProvider[]
  hasFeature: (feature: AppFeature) => boolean
  features: AppFeature[]
}

const Context = createContext<AppConfigContext>({} as AppConfigContext)

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const sdk = useSdk()
  const configQuery = useQuery({
    queryKey: ['app-config'],
    queryFn: () => sdk.appConfig().then((res) => res.data),
  })
  const appConfig = useMemo(() => configQuery.data?.config, [configQuery.data?.config])

  const authEnabled = useMemo(() => {
    if (!appConfig) return false
    const { authLoginProviders } = appConfig
    return !!authLoginProviders?.length
  }, [appConfig])

  const enabledProviders: IdentityProvider[] = useMemo(
    () => (appConfig ? ((appConfig.authLoginProviders ?? []).filter(Boolean) as IdentityProvider[]) : []),
    [appConfig],
  )

  const features = useMemo(() => appConfig?.features ?? ([] as AppFeature[]), [appConfig])

  const value = {
    appConfig: appConfig,
    appConfigLoading: configQuery.isLoading,
    authEnabled,
    enabledProviders,
    hasFeature: (feature: AppFeature) => features.includes(feature),
    features,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAppConfig() {
  return useContext(Context)
}
