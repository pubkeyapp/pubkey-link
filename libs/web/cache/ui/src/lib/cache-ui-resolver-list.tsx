import { CacheResolver, NetworkCluster } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { CacheUiResolverItem } from './cache-ui-resolver-item'

export function CacheUiResolverList({
  cluster,
  resolvers,
  resolve,
}: {
  cluster: NetworkCluster
  resolvers: CacheResolver[]
  resolve: (resolverId: string) => Promise<void>
}) {
  return (
    <UiStack>
      {resolvers?.map((resolver) => (
        <CacheUiResolverItem
          key={resolver.id}
          cluster={cluster}
          resolver={resolver}
          resolve={() => resolve(resolver.id)}
        />
      ))}
    </UiStack>
  )
}
