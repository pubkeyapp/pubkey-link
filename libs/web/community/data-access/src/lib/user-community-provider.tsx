import { createContext, ReactNode, useContext } from 'react'
import { Community, NetworkCluster } from '@pubkey-link/sdk'

export interface UserCommunityProviderContext {
  community: Community
  communityId: string
  cluster: NetworkCluster
}

const Context = createContext<UserCommunityProviderContext>({} as UserCommunityProviderContext)

export function UserCommunityProvider({ children, community }: { children: ReactNode; community: Community }) {
  const value: UserCommunityProviderContext = {
    community,
    communityId: community.id,
    cluster: community.cluster,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useUserCommunity() {
  return useContext(Context)
}
