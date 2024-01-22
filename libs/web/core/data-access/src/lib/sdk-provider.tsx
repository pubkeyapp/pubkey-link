import { getGraphQLSdk, Sdk } from '@pubkey-link/sdk'
import { createContext, ReactNode, useContext } from 'react'

const Context = createContext<Sdk>({} as Sdk)

export function SdkProvider({ children }: { children: ReactNode }) {
  const sdk: Sdk = getGraphQLSdk('/graphql')

  return <Context.Provider value={sdk}>{children}</Context.Provider>
}

export function useSdk() {
  return useContext(Context)
}
