import { CacheResolver, NetworkCluster } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { CacheUiResolverItem } from './cache-ui-resolver-item'

export function CacheUiResolverList({
  cluster,
  sync,
  resolvers,
  resolve,
}: {
  cluster: NetworkCluster
  sync: (resolverId: string) => Promise<void>
  resolvers: CacheResolver[]
  resolve: (resolverId: string) => Promise<void>
}) {
  return (
    <UiStack>
      {resolvers?.map((resolver) => (
        <CacheUiResolverItem
          key={resolver.id}
          cluster={cluster}
          sync={() => sync(resolver.id)}
          resolver={resolver}
          resolve={() => resolve(resolver.id)}
        />
      ))}
    </UiStack>
  )
}
